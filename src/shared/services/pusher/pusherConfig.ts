export const PUSHER_CONFIG = {
  appKey: import.meta.env.VITE_PUSHER_APP_KEY || '',
  cluster: import.meta.env.VITE_PUSHER_CLUSTER || 'eu',
  forceTLS: true,
  authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/api/v1/broadcasting/auth`,
} as const;

// Channel names
export const PUSHER_CHANNELS = {
  school: (schoolId: string) => `school-${schoolId}`,
  notifications: (userId: string) => `notifications.${userId}`,
  requests: 'requests',
} as const;

// Event names
export const PUSHER_EVENTS = {
  newRequest: 'new-request',
  requestUpdated: 'request-updated',
  requestCancelled: 'request-cancelled',
  newNotification: 'new-notification',
} as const;
