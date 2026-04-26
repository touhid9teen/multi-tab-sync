import React from 'react';
import TransactionForm from "@/components/TransactionForm";
import TransactionTableWorker from "@/components/TransactionTableWorker";

import { WorkerMessage } from '@/hooks/use-worker-sync';

interface DashboardProps {
  onBroadcast: (type: WorkerMessage["type"], payload?: any) => void;
}

export default function Dashboard({ onBroadcast }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div className="px-2 flex justify-between items-end">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Submit to Hub</h3>
          <span className="text-[10px] text-indigo-900 font-bold bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">Worker Dispatcher</span>
        </div>
        <TransactionForm onSuccess={() => onBroadcast('REFETCH')} />
      </div>
      <div className="space-y-6">
        <div className="px-2 flex justify-between items-end">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Centralized Ledger</h3>
          <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">Hub Listener</span>
        </div>
        <TransactionTableWorker />
      </div>
    </div>
  );
}
