import { useEffect, useRef } from 'react';

import { usePusher, PUSHER_CHANNELS, PUSHER_EVENTS } from '@/shared/services/pusher';
import { fetchSchoolRequests } from '@/features/school/pickup-requests/store/requestsThunks';
import toast from 'react-hot-toast';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useResponsiveVoiceSpeech } from './useResponsiveVoiceSpeech';

interface UsePusherRequestsOptions {
  onNewRequest?: () => void;
  onRequestUpdated?: () => void;
  onRequestCancelled?: () => void;
}

export const usePusherRequests = (options?: UsePusherRequestsOptions) => {
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

  // Use ref to avoid stale closures
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (!channel) {
      return;
    }

    // طلب جديد (عادي أو سريع أو بانتظار الاستلام)
    const handleNewRequest = (data: any) => {
      const request = data.request || data;
      const studentName = request?.student?.fullName || 'طالب';
      const isFastRequest = request?.status === 'fast_request';
      const isWaitingOutside = request?.status === 'waiting_outside';
      const shouldPlaySound = isFastRequest || isWaitingOutside;

      if (isFastRequest) {
        toast.success(`⚡ طلب سريع جديد من ${studentName}`, {
          duration: 8000,
          icon: '⚡',
          style: {
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: '#fff',
            fontFamily: 'Cairo, Tajawal, system-ui, -apple-system, sans-serif',
            direction: 'rtl',
            textAlign: 'right',
            padding: '20px 24px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)',
            minWidth: '320px',
          },
        });
      } else if (isWaitingOutside) {
        toast.success(`🚗 ${studentName} بانتظار الاستلام`, {
          duration: 8000,
          icon: '🚗',
          style: {
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: '#fff',
            fontFamily: 'Cairo, Tajawal, system-ui, -apple-system, sans-serif',
            direction: 'rtl',
            textAlign: 'right',
            padding: '20px 24px',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
            minWidth: '320px',
          },
        });
      } else {
        toast.success(`📋 طلب استلام جديد للطالب ${studentName}`, {
          duration: 6000,
          style: {
            background: '#fff',
            color: '#1f2937',
            fontFamily: 'Cairo, Tajawal, system-ui, -apple-system, sans-serif',
            direction: 'rtl',
            textAlign: 'right',
            padding: '18px 22px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '12px',
            border: '2px solid hsl(206, 71%, 63%)',
            boxShadow: '0 6px 20px rgba(74, 144, 205, 0.2)',
            minWidth: '300px',
          },
        });
      }

      // نطق الرسالة للطلب السريع أو بانتظار الاستلام
      if (shouldPlaySound) {
        const message = data.message || request?.message;
        if (message) {
          // تشغيل الصوت فوراً
          speakText(message, true);
          
          // تشغيل الصوت مرة ثانية بعد 7 ثواني للتأكيد
          setTimeout(() => {
            speakText(message, true);
          }, 7000);
        }
      }

      // Refresh requests list
      dispatch(fetchSchoolRequests({ page: 1, limit: 10 }));
      
      // Call custom callback
      optionsRef.current?.onNewRequest?.();
    };

    // تحديث طلب
    const handleRequestUpdated = (data: unknown) => {
      const request = data.request || data;
      toast(`تم تحديث الطلب #${request?.id || ''}`, {
        duration: 3000,
        icon: 'ℹ️',
      });
      // Refresh requests list
      dispatch(fetchSchoolRequests({ page: 1, limit: 10 }));
      
      // Call custom callback
      optionsRef.current?.onRequestUpdated?.();
    };

    // إلغاء طلب
    const handleRequestCancelled = (data: unknown) => {
      const request = data.request || data;
      toast.error(`تم إلغاء الطلب #${request?.id || ''}`, {
        duration: 3000,
      });
      // Refresh requests list
      dispatch(fetchSchoolRequests({ page: 1, limit: 10 }));
      
      // Call custom callback
      optionsRef.current?.onRequestCancelled?.();
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
