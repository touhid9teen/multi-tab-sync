'use client';

import { useEffect, useCallback } from 'react';

export function useBroadcastSync(onMessage?: (msg: string) => void) {
  useEffect(() => {
    const channel = new BroadcastChannel('transaction_sync');

    channel.onmessage = (event) => {
      const msg = event.data;
      const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
      
      // Update UI Log (Shared between tabs)
      const logContainer = document.getElementById('sync-log-container');
      if (logContainer) {
        const logEntry = document.createElement('div');
        logEntry.className = 'py-2 border-b border-gray-50 flex justify-between items-center text-indigo-600 font-bold animate-flash';
        logEntry.innerHTML = `
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Received Signal</span>
            <span>[${timestamp}] ${msg}</span>
          </div>
          <span className="opacity-50 font-normal text-[10px]">SYNC_OK</span>
        `;
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

  const broadcast = useCallback((msg: string) => {
    const channel = new BroadcastChannel('transaction_sync');
    const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });

    channel.postMessage(msg);
    channel.close();

    // Update UI Log (For the sender)
    const logContainer = document.getElementById('sync-log-container');
    if (logContainer) {
      const logEntry = document.createElement('div');
      logEntry.className = 'py-2 border-b border-gray-50 flex justify-between items-center text-blue-600';
      logEntry.innerHTML = `
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Dispatched Signal</span>
          <span>[${timestamp}] ${msg}</span>
        </div>
        <span className="opacity-50 font-normal text-[10px]">SEND_OK</span>
      `;
      logContainer.prepend(logEntry);
    }
  }, []);

  return { broadcast };
}
