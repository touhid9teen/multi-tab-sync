'use client';

import { useState, useEffect } from 'react';

type LabType = 'broadcast' | 'worker' | 'polling';

export function useRequestCounter(lab: LabType) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Initial load
    const saved = localStorage.getItem(`requests_${lab}`);
    if (saved) {
      Promise.resolve().then(() => setCount(parseInt(saved, 10)));
    }

    const handleUpdate = () => {
      const current = localStorage.getItem(`requests_${lab}`);
      if (current) setCount(parseInt(current, 10));
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener(`request_increment_${lab}`, handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener(`request_increment_${lab}`, handleUpdate);
    };
  }, [lab]);

  return count;
}

export function incrementRequestCount(lab: LabType) {
  const key = `requests_${lab}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  const next = current + 1;
  localStorage.setItem(key, next.toString());
  window.dispatchEvent(new Event(`request_increment_${lab}`));
}

export function resetRequestCounters() {
  localStorage.setItem('requests_broadcast', '0');
  localStorage.setItem('requests_worker', '0');
  localStorage.setItem('requests_polling', '0');
  window.dispatchEvent(new Event('request_increment_broadcast'));
  window.dispatchEvent(new Event('request_increment_worker'));
  window.dispatchEvent(new Event('request_increment_polling'));
}
