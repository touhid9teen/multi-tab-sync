'use client';

import { useEffect, useCallback, useRef } from 'react';

export type WorkerMessage = {
  type: 'REFETCH' | 'PING' | 'COUNT_UPDATE' | 'DISCONNECT';
  payload?: unknown;
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

  const broadcast = useCallback((type: WorkerMessage['type'], payload?: unknown) => {
    if (workerRef.current) {
      workerRef.current.port.postMessage({ type, payload });
    }
  }, []);

  return { broadcast };
}
