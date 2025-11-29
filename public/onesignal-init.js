// دالة لطلب إذن الإشعارات باستخدام Notification API
async function requestNotificationPermission() {
  try {
    // التحقق من دعم المتصفح لـ Notification API
    if (!("Notification" in window)) {
      console.error("This browser does not support notifications.");
      return;
    }

    // التحقق من حالة الإذن الحالية
    if (Notification.permission === "granted") {
      console.log("Notification permission already granted.");
      return;
    }

    if (Notification.permission === "denied") {
      console.log("Notification permission already denied by user.");
      return;
    }

    // طلب الإذن من المستخدم
    const permission = await Notification.requestPermission();
    console.log("Notification permission result:", permission);

    if (permission === "granted") {
      console.log("User granted notification permission.");
    } else if (permission === "denied") {
      console.log("User denied notification permission.");
    } else {
      console.log("User dismissed the permission prompt.");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
}

// تهيئة OneSignal وإعدادات الإشعارات
document.addEventListener("DOMContentLoaded", () => {
  // طلب إذن الإشعارات فور تحميل الصفحة
  requestNotificationPermission().then(() => {
    console.log("Notification permission request completed, proceeding with OneSignal initialization.");

    // تهيئة OneSignal
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    OneSignalDeferred.push(async function(OneSignal) {
      try {
        await OneSignal.init({
          appId: "be402de6-443a-4710-8a31-93fa3ba428ad",
          allowLocalhostAsSecureOrigin: true,
          notifyButton: {
            enable: true,
          },
          serviceWorkerPath: 'OneSignalSDKWorker.js',
          serviceWorkerUpdaterPath: 'OneSignalSDKUpdaterWorker.js'
        });

        console.log("OneSignal is fully initialized.");

        // مستمع للإشعارات عندما تكون الصفحة مفتوحة (Foreground)
        OneSignal.Notifications.addEventListener('foregroundNotificationDisplay', (event) => {
          console.log("Foreground notification received:", event);
          const notification = event.notification;
          
          // عرض الإشعار كتنبيه (Alert) داخل التطبيق
          alert(`New Notification: ${notification.title}\n${notification.body}`);
          // يمكنك استبدال alert بعرض مخصص داخل واجهة المستخدم
        });

        // مستمع لتغيير حالة الاشتراك
        OneSignal.User.PushSubscription.addEventListener('change', function(event) {
          const subscriptionId = OneSignal.User.PushSubscription.id;
          console.log("Subscription state changed. Subscribed: ", event.current, "Subscription ID: ", subscriptionId);
        });

        // دالة لجلب subscriptionId
        window.getOneSignalSubscriptionId = function() {
          if (!OneSignal || !OneSignal.User || !OneSignal.User.PushSubscription) {
            console.error("OneSignal is not fully initialized yet.");
            return null;
          }

          const subscriptionId = OneSignal.User.PushSubscription.id;
          console.log("Subscription ID from OneSignal:", subscriptionId);
          return subscriptionId || null;
        };

        // محاولة جلب subscriptionId مع تأخير
        setTimeout(() => {
          const initialSubscriptionId = window.getOneSignalSubscriptionId();
          console.log("Initial Subscription ID after 2 seconds:", initialSubscriptionId);

          if (!initialSubscriptionId) {
            setTimeout(() => {
              const secondTry = window.getOneSignalSubscriptionId();
              console.log("Second try Subscription ID after 5 seconds:", secondTry);

              if (secondTry) {
                const event = new Event('onesignal-ready');
                window.dispatchEvent(event);
              } else {
                console.log("Subscription ID still null after 5 seconds, dispatching onesignal-ready anyway.");
                const event = new Event('onesignal-ready');
                window.dispatchEvent(event);
              }
            }, 3000);
          } else {
            const event = new Event('onesignal-ready');
            window.dispatchEvent(event);
          }
        }, 2000);

      } catch (error) {
        console.error("Error initializing OneSignal:", error);
        const event = new Event('onesignal-ready');
        window.dispatchEvent(event);
      }
    });
  });
});
