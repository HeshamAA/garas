import { useEffect, useState } from 'react';

declare global {
  interface Window {
    OneSignal?: any;
    OneSignalDeferred?: any[];
    getOneSignalSubscriptionId?: () => string | null;
  }
}

export const useOneSignal = () => {
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleOneSignalReady = () => {
      setIsReady(true);
      
      // محاولة جلب الـ subscription ID
      if (window.getOneSignalSubscriptionId) {
        const id = window.getOneSignalSubscriptionId();
        setSubscriptionId(id);
        console.log('OneSignal Subscription ID:', id);
      }
    };

    // الاستماع لحدث onesignal-ready
    window.addEventListener('onesignal-ready', handleOneSignalReady);

    // التحقق إذا كان OneSignal جاهز بالفعل
    if (window.OneSignal) {
      handleOneSignalReady();
    }

    return () => {
      window.removeEventListener('onesignal-ready', handleOneSignalReady);
    };
  }, []);

  const getSubscriptionId = () => {
    if (window.getOneSignalSubscriptionId) {
      const id = window.getOneSignalSubscriptionId();
      setSubscriptionId(id);
      return id;
    }
    return null;
  };

  return {
    subscriptionId,
    isReady,
    getSubscriptionId,
  };
};
