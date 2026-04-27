'use client';

import { useCallback } from 'react';
import { useBroadcastChannel } from './use-broadcast-channel';

export function useBroadcastSync(onMessage?: (msg: string) => void) {

  
  const handleIncomingMessage = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
    
    // Update UI Log (Shared between tabs)
    const logContainer = document.getElementById('sync-log-container');
    if (logContainer) {
      const logEntry = document.createElement('div');
      logEntry.className = 'py-2 border-b border-gray-50 flex justify-between items-center text-indigo-600 font-bold animate-flash';
      logEntry.innerHTML = `
        <div class="flex flex-col">
          <span class="text-[10px] text-gray-400 uppercase tracking-widest font-black">Received Signal</span>
          <span>[${timestamp}] ${msg}</span>
        </div>
        <span class="opacity-50 font-normal text-[10px]">SYNC_OK</span>
      `;
      logContainer.prepend(logEntry);
    }

    if (onMessage) {
      onMessage(msg);
    }
  }, [onMessage]);

  const { postMessage } = useBroadcastChannel('transaction_sync', handleIncomingMessage);

  const broadcast = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });

    postMessage(msg);

    // Update UI Log (For the sender)
    const logContainer = document.getElementById('sync-log-container');
    if (logContainer) {
      const logEntry = document.createElement('div');
      logEntry.className = 'py-2 border-b border-gray-50 flex justify-between items-center text-blue-600';
      logEntry.innerHTML = `
        <div class="flex flex-col">
          <span class="text-[10px] text-gray-400 uppercase tracking-widest font-black">Dispatched Signal</span>
          <span>[${timestamp}] ${msg}</span>
        </div>
        <span class="opacity-50 font-normal text-[10px]">SEND_OK</span>
      `;
      logContainer.prepend(logEntry);
    }
  }, [postMessage]);

  return { broadcast };
}
