'use client';

import { useEffect, useCallback, useRef } from 'react';

export type WorkerMessage = {
  type: 'REFETCH' | 'PING' | 'COUNT_UPDATE' | 'DISCONNECT';
  payload?: any;
};

export function useWorkerSync(onMessage?: (msg: WorkerMessage) => void) {
  const workerRef = useRef<SharedWorker | null>(null);

  useEffect(() => {
    const worker = new SharedWorker('/workers/sync-worker.js');
    workerRef.current = worker;

    worker.port.onmessage = (event) => {
      const msg = event.data as WorkerMessage;
      const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
      
      if (msg.type === 'COUNT_UPDATE') {
        window.dispatchEvent(new CustomEvent('worker-count-update', { detail: msg.payload }));
        return;
      }

      const logContainer = document.getElementById('worker-log-container');
      if (logContainer) {
        const logEntry = document.createElement('div');
        logEntry.className = 'py-2 border-b border-gray-50 flex justify-between items-center text-indigo-600 font-bold animate-in fade-in slide-in-from-left-2';
        logEntry.innerHTML = `
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Hub Recv</span>
            <span>[${timestamp}] ${msg.type}</span>
          </div>
          <span className="opacity-50 font-normal text-[10px]">HUB_OK</span>
        `;
        logContainer.prepend(logEntry);
      }

      if (onMessage) {
        onMessage(msg);
      }
    };

    worker.port.start();

    window.addEventListener('beforeunload', () => {
      worker.port.postMessage({ type: 'DISCONNECT' });
    });

    return () => {
      worker.port.postMessage({ type: 'DISCONNECT' });
      worker.port.close();
    };
  }, [onMessage]);

  const broadcast = useCallback((type: WorkerMessage['type'], payload?: any) => {
    if (workerRef.current) {
      const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
      workerRef.current.port.postMessage({ type, payload });
      
      const logContainer = document.getElementById('worker-log-container');
      if (logContainer) {
        const logEntry = document.createElement('div');
        logEntry.className = 'py-2 border-b border-gray-50 flex justify-between items-center text-blue-600 animate-in fade-in slide-in-from-right-2';
        logEntry.innerHTML = `
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Hub Send</span>
            <span>[${timestamp}] ${type}</span>
          </div>
          <span className="opacity-50 font-normal text-[10px]">TX_OK</span>
        `;
        logContainer.prepend(logEntry);
      }
    }
  }, []);

  return { broadcast };
}
