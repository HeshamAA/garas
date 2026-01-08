import { useEffect, useCallback } from 'react';
import { Channel } from 'pusher-js';
import { pusherService } from './pusherService';
import { useAppSelector } from '@/shared/hooks';

interface UsePusherOptions {
  channelName: string;
  enabled?: boolean;
}

interface UsePusherReturn {
  channel: Channel | null;
  subscribe: () => Channel | null;
  unsubscribe: () => void;
  isConnected: boolean;
}

export const usePusher = ({ channelName, enabled = true }: UsePusherOptions): UsePusherReturn => {
  const { token } = useAppSelector((state) => state.auth);

  const subscribe = useCallback(() => {
    if (!enabled || !channelName) {
      return null;
    }

    // Initialize Pusher if not already initialized
    if (!pusherService.isConnected()) {
      pusherService.initialize(token);
    }

    return pusherService.subscribe(channelName);
  }, [channelName, enabled, token]);

  const unsubscribe = useCallback(() => {
    pusherService.unsubscribe(channelName);
  }, [channelName]);

  useEffect(() => {
    if (!enabled) return;

    subscribe();

    return () => {
      unsubscribe();
    };
  }, [enabled, subscribe, unsubscribe, channelName]);

  const currentChannel = pusherService.getChannel(channelName);

  return {
    channel: currentChannel || null,
    subscribe,
    unsubscribe,
    isConnected: pusherService.isConnected(),
  };
};
