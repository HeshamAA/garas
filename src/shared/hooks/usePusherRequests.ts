import { useEffect } from 'react';

import { usePusher, PUSHER_CHANNELS, PUSHER_EVENTS } from '@/shared/services/pusher';
import { fetchSchoolRequests } from '@/features/school/pickup-requests/store/requestsThunks';
import toast from 'react-hot-toast';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useResponsiveVoiceSpeech } from './useResponsiveVoiceSpeech';

export const usePusherRequests = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { speakText } = useResponsiveVoiceSpeech();
  const schoolId = user?.school?.id;

  const channelName = schoolId ? PUSHER_CHANNELS.school(schoolId) : '';
  const enabled = !!schoolId && user?.role?.toLowerCase() === 'school';

  const { channel } = usePusher({
    channelName,
    enabled,
  });

  useEffect(() => {
    if (!channel) {
      return;
    }

    // طلب جديد (عادي أو سريع)
    const handleNewRequest = (data: any) => {
      const request = data.request || data;
      const studentName = request?.student?.fullName || 'طالب';
      const isFastRequest = request?.status === 'fast_request';

      if (isFastRequest) {
        toast.success(
          `⚡ طلب سريع جديد من ${studentName}`,
          {
            duration: 5000,
            icon: '⚡',
          }
        );

        // نطق الرسالة اللي جاية في الـ event للطلب السريع
        const message = data.message || request?.message;
        if (message) {
          speakText(message, true);
        }
      } else {
        toast.success(
          `📋 طلب استلام جديد من ${studentName}`,
          {
            duration: 4000,
          }
        );
      }

      // Refresh requests list
      dispatch(fetchSchoolRequests({ page: 1, limit: 10 }));
    };

    // تحديث طلب
    const handleRequestUpdated = (data: any) => {
      const request = data.request || data;
      toast(`تم تحديث الطلب #${request?.id || ''}`, {
        duration: 3000,
        icon: 'ℹ️',
      });
      // Refresh requests list
      dispatch(fetchSchoolRequests({ page: 1, limit: 10 }));
    };

    // إلغاء طلب
    const handleRequestCancelled = (data: any) => {
      const request = data.request || data;
      toast.error(`تم إلغاء الطلب #${request?.id || ''}`, {
        duration: 3000,
      });
      // Refresh requests list
      dispatch(fetchSchoolRequests({ page: 1, limit: 10 }));
    };

    // Bind events
    channel.bind(PUSHER_EVENTS.newRequest, handleNewRequest);
    channel.bind(PUSHER_EVENTS.requestUpdated, handleRequestUpdated);
    channel.bind(PUSHER_EVENTS.requestCancelled, handleRequestCancelled);

    // Cleanup
    return () => {
      channel.unbind(PUSHER_EVENTS.newRequest, handleNewRequest);
      channel.unbind(PUSHER_EVENTS.requestUpdated, handleRequestUpdated);
      channel.unbind(PUSHER_EVENTS.requestCancelled, handleRequestCancelled);
    };
  }, [channel, dispatch, speakText]);

  return { isConnected: !!channel };
};
