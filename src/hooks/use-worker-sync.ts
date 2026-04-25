'use client';

import { useEffect, useCallback, useRef } from 'react';

type WorkerMessage = {
  type: 'REFETCH' | 'PING' | 'COUNT_UPDATE';
  payload?: any;
};

export function useWorkerSync(onMessage?: (msg: WorkerMessage) => void) {
  const workerRef = useRef<SharedWorker | null>(null);

  useEffect(() => {
    const worker = new SharedWorker('/workers/sync-worker.js');
    workerRef.current = worker;

    worker.port.onmessage = (event) => {
      const msg = event.data as WorkerMessage;
      
      // 1. Handle Internal Count Updates
      if (msg.type === 'COUNT_UPDATE') {
        window.dispatchEvent(new CustomEvent('worker-count-update', { detail: msg.payload }));
        return;
      }

      // 2. Update UI Log
      const logContainer = document.getElementById('worker-log-container');
      if (logContainer) {
        const logEntry = document.createElement('div');
        logEntry.className = 'py-2 border-b border-gray-50 flex justify-between items-center text-indigo-600 font-bold animate-in fade-in slide-in-from-left-2';
        logEntry.innerHTML = `
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Received via Hub</span>
            <span>${msg.type}</span>
          </div>
          <span className="opacity-50 font-normal text-[10px]">${new Date().toLocaleTimeString()}</span>
        `;
        logContainer.prepend(logEntry);
      }

      if (onMessage) {
        onMessage(msg);
      }
    };

    worker.port.start();

    // Signal disconnect on unmount
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
      workerRef.current.port.postMessage({ type, payload });
      
      const logContainer = document.getElementById('worker-log-container');
      if (logContainer) {
        const logEntry = document.createElement('div');
        logEntry.className = 'py-2 border-b border-gray-50 flex justify-between items-center text-blue-600 animate-in fade-in slide-in-from-right-2';
        logEntry.innerHTML = `
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">Dispatched to Hub</span>
            <span>${type}</span>
          </div>
          <span className="opacity-50 font-normal text-[10px]">${new Date().toLocaleTimeString()}</span>
        `;
        logContainer.prepend(logEntry);
      }
    }
  }, []);

  return { broadcast };
}
