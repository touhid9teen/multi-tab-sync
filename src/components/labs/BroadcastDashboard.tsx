import TransactionForm from "../TransactionForm";
import TransactionTable from "../TransactionTable";

interface BroadcastDashboardProps {
  onBroadcast: (message: string) => void;
}

export default function BroadcastDashboard({
  onBroadcast,
}: BroadcastDashboardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div className="px-2 flex justify-between items-end">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Transaction Entry
          </h3>
          <span className="text-[10px] text-indigo-500 font-bold bg-indigo-50 px-2 py-1 rounded-md">
            Transmitter Mode
          </span>
        </div>
        <TransactionForm onSuccess={() => onBroadcast("REFETCH")} />
      </div>
      <div className="space-y-6">
        <div className="px-2 flex justify-between items-end">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Real-time Ledger
          </h3>
          <span className="text-[10px] text-green-500 font-bold bg-green-50 px-2 py-1 rounded-md">
            Receiver Mode
          </span>
        </div>
        <TransactionTable />
      </div>
    </div>
  );
}
