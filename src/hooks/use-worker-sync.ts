'use client';

import { useEffect, useCallback, useRef } from 'react';

type WorkerMessage = {
  type: 'REFETCH' | 'PING';
  payload?: any;
};

export function useWorkerSync(onMessage?: (msg: WorkerMessage) => void) {
  const workerRef = useRef<SharedWorker | null>(null);

  useEffect(() => {
    // 1. Initialize Shared Worker
    const worker = new SharedWorker('/workers/sync-worker.js');
    workerRef.current = worker;

    // 2. Setup Message Listener
    worker.port.onmessage = (event) => {
      const msg = event.data as WorkerMessage;
      
      // Update UI Log (Shared between tabs)
      const logContainer = document.getElementById('worker-log-container');
      if (logContainer) {
        const logEntry = document.createElement('div');
        logEntry.className = 'py-2 border-b border-gray-50 flex justify-between items-center text-indigo-600 font-bold';
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

    // 3. Start the port
    worker.port.start();

    return () => {
      // SharedWorker doesn't have a simple 'close' for all ports, 
      // but we can signal departure if needed.
      worker.port.close();
    };
  }, [onMessage]);

  const broadcast = useCallback((type: WorkerMessage['type'], payload?: any) => {
    if (workerRef.current) {
      workerRef.current.port.postMessage({ type, payload });
      
      // Local Log for the sender
      const logContainer = document.getElementById('worker-log-container');
      if (logContainer) {
        const logEntry = document.createElement('div');
        logEntry.className = 'py-2 border-b border-gray-50 flex justify-between items-center text-blue-600';
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
