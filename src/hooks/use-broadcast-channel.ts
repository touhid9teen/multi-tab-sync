'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * A robust, SSR-safe TypeScript hook for the native BroadcastChannel API.
 * Handles channel lifecycle (opening/closing) automatically.
 * 
 * @param channelName - The name of the channel to join.
 * @param onMessage - Optional callback executed when a message is received.
 * @returns { postMessage } - A function to broadcast messages to other tabs.
 */
export function useBroadcastChannel<T = unknown>(
  channelName: string,
  onMessage?: (data: T) => void
) {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const onMessageRef = useRef(onMessage);

  // Update ref when onMessage changes to avoid re-running initialization useEffect
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    // SSR Safety Check
    if (typeof window === 'undefined') return;

    // Initialize the channel
    const channel = new BroadcastChannel(channelName);
    channelRef.current = channel;

    // Listener for incoming messages
    const handleMessage = (event: MessageEvent<T>) => {
      onMessageRef.current?.(event.data);
    };

    channel.addEventListener('message', handleMessage);

    // Lifecycle: Ensure the channel is closed when the component unmounts
    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
      channelRef.current = null;
    };
  }, [channelName]);

  /**
   * Dispatches a message to all other instances of this channel.
   */
  const postMessage = useCallback((data: T) => {
    if (channelRef.current) {
      try {
        channelRef.current.postMessage(data);
      } catch (error) {
        console.error(`Error posting to BroadcastChannel "${channelName}":`, error);
      }
    } else if (typeof window !== 'undefined') {
      // Fallback for cases where it's called immediately before mount effect runs
      console.warn(`BroadcastChannel "${channelName}" is not yet initialized.`);
    }
  }, [channelName]);

  return { postMessage };
}
