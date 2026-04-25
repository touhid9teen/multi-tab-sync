'use client';

import * as Tabs from "@radix-ui/react-tabs";
import TransactionForm from "@/components/TransactionForm";
import TransactionTable from "@/components/TransactionTable";
import { useBroadcastSync } from "@/hooks/use-broadcast-sync";

export default function BroadcastLabPage() {
  const { broadcast } = useBroadcastSync();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Tabs.Root defaultValue="dashboard" className="w-full">
        <Tabs.List className="flex p-1 bg-gray-200/50 rounded-xl mb-8 w-fit">
          <Tabs.Trigger
            value="dashboard"
            className="px-6 py-2.5 text-sm font-bold rounded-lg text-gray-500 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
          >
            Dashboard
          </Tabs.Trigger>
          <Tabs.Trigger
            value="sync-logs"
            className="px-6 py-2.5 text-sm font-bold rounded-lg text-gray-500 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all"
          >
            Detailed Logs
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="dashboard" className="animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-2">Transaction Entry</h3>
              {/* Pass the broadcast logic here */}
              <TransactionForm onSuccess={() => broadcast('REFETCH')} />
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-2">Real-time Ledger</h3>
              <TransactionTable />
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="sync-logs" className="animate-in fade-in slide-in-from-bottom-2 duration-500 outline-none">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Detailed Sync History</h3>
              <p className="text-gray-500 max-w-sm mx-auto mt-2">
                This tab will display a deep-dive into the Broadcast Channel events, including latency and payload size.
              </p>
            </div>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">
              Enable Deep Tracking
            </button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
