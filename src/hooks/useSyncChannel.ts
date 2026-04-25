'use client';

import { useEffect, useCallback } from 'react';

type SyncMessage = 'REFETCH' | 'PING';

export function useSyncChannel(onMessage?: (msg: SyncMessage) => void) {
  const channelName = 'transaction_sync';

  const broadcast = useCallback((message: SyncMessage) => {
    const channel = new BroadcastChannel(channelName);
    channel.postMessage(message);
    
    const logContainer = document.getElementById('sync-log-container');
    if (logContainer) {
      const logEntry = document.createElement('div');
      logEntry.className = 'py-1 border-b border-gray-50 flex justify-between text-blue-600';
      logEntry.innerHTML = `<span>SENT: ${message}</span> <span class="opacity-50">${new Date().toLocaleTimeString()}</span>`;
      logContainer.prepend(logEntry);
    }
    
    channel.close();
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel(channelName);

    channel.onmessage = (event) => {
      const msg = event.data as SyncMessage;
      
      const logContainer = document.getElementById('sync-log-container');
      if (logContainer) {
        const logEntry = document.createElement('div');
        logEntry.className = 'py-1 border-b border-gray-50 flex justify-between text-indigo-600 font-bold';
        logEntry.innerHTML = `<span>RECV: ${msg}</span> <span class="opacity-50 font-normal">${new Date().toLocaleTimeString()}</span>`;
        logContainer.prepend(logEntry);
      }

      if (onMessage) {
        onMessage(msg);
      }
    };

    return () => {
      channel.close();
    };
  }, [onMessage]);

  return { broadcast };
}
