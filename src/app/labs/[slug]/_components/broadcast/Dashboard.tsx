import { useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionTable from "@/components/TransactionTable";

export default function Dashboard() {
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div className="px-2 flex justify-between items-end">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Transaction Entry</h3>
          <span className="text-[10px] text-indigo-500 font-bold bg-indigo-50 px-2 py-1 rounded-md">Transmitter Mode</span>
        </div>
        <TransactionForm onSuccess={() => setRefetchTrigger(prev => prev + 1)} />
      </div>
      <div className="space-y-6">
        <div className="px-2 flex justify-between items-end">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Real-time Ledger</h3>
          <span className="text-[10px] text-green-500 font-bold bg-green-50 px-2 py-1 rounded-md">Receiver Mode</span>
        </div>
        <TransactionTable refetchTrigger={refetchTrigger} />
      </div>
    </div>
  );
}
