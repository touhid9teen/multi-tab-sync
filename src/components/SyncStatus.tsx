'use client';

type SyncMethod = 'BroadcastChannel' | 'SharedWorker Hub' | 'TanStack Polling';

export default function SyncStatus({ method, status }: { method: SyncMethod, status: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        <div className={`w-3 h-3 rounded-full animate-pulse ${
          method === 'BroadcastChannel' ? 'bg-blue-500' : 
          method === 'SharedWorker Hub' ? 'bg-indigo-600' : 'bg-purple-600'
        }`} />
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Active Engine</p>
          <p className="text-sm font-black text-gray-900 tracking-tight">{method}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Status</p>
        <p className={`text-xs font-black uppercase tracking-tighter ${
          status === 'Healthy' ? 'text-green-500' : 'text-amber-500'
        }`}>{status}</p>
      </div>
    </div>
  );
}
