import React from 'react';
import TransactionForm from "@/components/TransactionForm";
import TransactionTablePolling from "@/components/TransactionTablePolling";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div className="px-2 flex justify-between items-end">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Submit Transaction</h3>
          <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded-md border border-purple-100">Sync Independent</span>
        </div>
        <TransactionForm />
      </div>
      <div className="space-y-6">
        <div className="px-2 flex justify-between items-end">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Polling Ledger</h3>
          <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-1 rounded-md border border-purple-100">Automated Fetch</span>
        </div>
        <TransactionTablePolling />
      </div>
    </div>
  );
}
