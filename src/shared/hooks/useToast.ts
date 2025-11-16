import toast from 'react-hot-toast';

export const useToast = () => {
  return {
    success: (message: string) => {
      toast.success(message, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: 'hsl(142 76% 45%)',
          color: '#fff',
          fontFamily: 'Cairo, Tajawal, system-ui, -apple-system, sans-serif',
          direction: 'rtl',
          textAlign: 'right',
        },
      });
    },
    error: (message: string) => {
      toast.error(message, {
        duration: 5000,
        position: 'top-center',
        style: {
          background: 'hsl(0 72% 55%)',
          color: '#fff',
          fontFamily: 'Cairo, Tajawal, system-ui, -apple-system, sans-serif',
          direction: 'rtl',
          textAlign: 'right',
        },
      });
    },
    info: (message: string) => {
      toast(message, {
        duration: 4000,
        position: 'top-center',
        icon: 'ℹ️',
        style: {
          background: 'hsl(206 71% 63%)',
          color: '#fff',
          fontFamily: 'Cairo, Tajawal, system-ui, -apple-system, sans-serif',
          direction: 'rtl',
          textAlign: 'right',
        },
      });
    },
    warning: (message: string) => {
      toast(message, {
        duration: 4000,
        position: 'top-center',
        icon: '⚠️',
        style: {
          background: 'hsl(45 93% 50%)',
          color: 'hsl(220 15% 25%)',
          fontFamily: 'Cairo, Tajawal, system-ui, -apple-system, sans-serif',
          direction: 'rtl',
          textAlign: 'right',
        },
      });
    },
    loading: (message: string) => {
      return toast.loading(message, {
        position: 'top-center',
        style: {
          fontFamily: 'Cairo, Tajawal, system-ui, -apple-system, sans-serif',
          direction: 'rtl',
          textAlign: 'right',
        },
      });
    },
    dismiss: (toastId?: string) => {
      toast.dismiss(toastId);
    },
  };
};
export { toast };