import Pusher, { Channel } from 'pusher-js';
import { PUSHER_CONFIG } from './pusherConfig';
import toast from 'react-hot-toast';

class PusherService {
  private pusher: Pusher | null = null;
  private channels: Map<string, Channel> = new Map();

  initialize(authToken?: string) {
    if (this.pusher) {
      return this.pusher;
    }

    this.pusher = new Pusher(PUSHER_CONFIG.appKey, {
      cluster: PUSHER_CONFIG.cluster,
      forceTLS: PUSHER_CONFIG.forceTLS,
      authEndpoint: PUSHER_CONFIG.authEndpoint,
      auth: {
        headers: {
          Authorization: `Bearer ${authToken || localStorage.getItem('authToken')}`,
        },
      },
    });

    // Connection state logging
    this.pusher.connection.bind('connected', () => {
      
    });

    this.pusher.connection.bind('disconnected', () => {
      toast.error('تم قطع الاتصال بالخادم');
    });

    this.pusher.connection.bind('error', () => {
      toast.error('حدث خطأ في الاتصال');
    });

    return this.pusher;
  }

  subscribe(channelName: string): Channel | null {
    if (!this.pusher) {
      toast.error('لم يتم تهيئة الاتصال');
      return null;
    }

    // Return existing channel if already subscribed
    if (this.channels.has(channelName)) {
      return this.channels.get(channelName)!;
    }

    const channel = this.pusher.subscribe(channelName);
    this.channels.set(channelName, channel);

    channel.bind('pusher:subscription_error', () => {
      toast.error('فشل الاشتراك في القناة');
    });

    return channel;
  }

  unsubscribe(channelName: string) {
    if (!this.pusher) return;

    this.pusher.unsubscribe(channelName);
    this.channels.delete(channelName);
  }

  disconnect() {
    if (!this.pusher) return;

    // Unsubscribe from all channels
    this.channels.forEach((_, channelName) => {
      this.unsubscribe(channelName);
    });

    this.pusher.disconnect();
    this.pusher = null;
  }

  getChannel(channelName: string): Channel | undefined {
    return this.channels.get(channelName);
  }

  isConnected(): boolean {
    return this.pusher?.connection.state === 'connected';
  }
}

// Singleton instance
export const pusherService = new PusherService();
