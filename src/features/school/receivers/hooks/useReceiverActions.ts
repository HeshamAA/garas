import { useAppDispatch, useToast } from '@/shared/hooks';
import {
  updateReceiverStatus,
  deleteReceiver,
  activateTrustedReceiver,
  deactivateTrustedReceiver,
  approveTrustedReceiver,
  rejectTrustedReceiver,
} from '../store/receiversThunks';

export const useReceiverActions = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleActivateReceiver = async (receiverId: string) => {
    try {
      await dispatch(updateReceiverStatus({ id: receiverId, status: 'active' })).unwrap();
      toast.success('تم تنشيط المستلم بنجاح');
    } catch (error) {
      toast.error('فشل تنشيط المستلم');
    }
  };

  const handleDeactivateReceiver = async (receiverId: string) => {
    try {
      await dispatch(updateReceiverStatus({ id: receiverId, status: 'inactive' })).unwrap();
      toast.success('تم تعطيل المستلم بنجاح');
    } catch (error) {
      toast.error('فشل تعطيل المستلم');
    }
  };

  const handleDeleteReceiver = async (receiverId: string) => {
    try {
      await dispatch(deleteReceiver(receiverId)).unwrap();
      toast.success('تم حذف المستلم بنجاح');
    } catch (error) {
      toast.error('فشل حذف المستلم');
    }
  };

  const handleActivateTrustedReceiver = async (receiverId: string) => {
    try {
      await dispatch(activateTrustedReceiver(receiverId)).unwrap();
      toast.success('تم تنشيط المستخدم المعتمد بنجاح');
    } catch (error) {
      toast.error('فشل تنشيط المستخدم المعتمد');
    }
  };

  const handleDeactivateTrustedReceiver = async (receiverId: string) => {
    try {
      await dispatch(deactivateTrustedReceiver(receiverId)).unwrap();
      toast.success('تم تجميد المستخدم المعتمد بنجاح');
    } catch (error) {
      toast.error('فشل تجميد المستخدم المعتمد');
    }
  };

  const handleApproveTrustedReceiver = async (receiverId: string) => {
    try {
      await dispatch(approveTrustedReceiver(receiverId)).unwrap();
      toast.success('تم الموافقة على المستخدم المعتمد بنجاح');
    } catch (error) {
      toast.error('فشلت الموافقة على المستخدم المعتمد');
    }
  };

  const handleRejectTrustedReceiver = async (receiverId: string) => {
    try {
      await dispatch(rejectTrustedReceiver(receiverId)).unwrap();
      toast.success('تم رفض المستخدم المعتمد بنجاح');
    } catch (error) {
      toast.error('فشل رفض المستخدم المعتمد');
    }
  };

  return {
    handleActivateReceiver,
    handleDeactivateReceiver,
    handleDeleteReceiver,
    handleActivateTrustedReceiver,
    handleDeactivateTrustedReceiver,
    handleApproveTrustedReceiver,
    handleRejectTrustedReceiver,
  };
};

export default useReceiverActions;