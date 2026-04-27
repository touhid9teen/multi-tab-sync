'use client';

import { useCallback } from 'react';
import { useBroadcastChannel } from './use-broadcast-channel';

export function useBroadcastSync(onMessage?: (msg: string) => void) {

  
  const handleIncomingMessage = useCallback((msg: string) => {
    if (onMessage) {
      onMessage(msg);
    }
  }, [onMessage]);

  const { postMessage } = useBroadcastChannel('transaction_sync', handleIncomingMessage);

  const broadcast = useCallback((msg: string) => {
    postMessage(msg);
  }, [postMessage]);

  return { broadcast };
}
