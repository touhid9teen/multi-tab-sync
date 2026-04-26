import React from 'react';

export default function Theory() {
  return (
    <div className="bg-white rounded-[32px] shadow-2xl shadow-purple-100/50 border border-gray-100 p-12 space-y-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <section className="relative space-y-4">
        <div className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-purple-200">
          The Ultimate Fallback
        </div>
        <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">Polling: <br/>Reliability Over Efficiency</h2>
        <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
          Polling ensures consistency by periodically asking the server for the latest state, regardless of whether a change occurred.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-8 bg-purple-50/30 rounded-[24px] border border-purple-100/50 space-y-4">
           <h4 className="text-lg font-black text-purple-900 tracking-tight">Guaranteed Sync</h4>
           <p className="text-sm text-gray-600 leading-relaxed">Even if the browser restricts background scripts or BroadcastChannels are blocked, polling will eventually sync all tabs.</p>
         </div>
         
         <div className="p-8 bg-purple-50/30 rounded-[24px] border border-purple-100/50 space-y-4">
           <h4 className="text-lg font-black text-purple-900 tracking-tight">Simplicity</h4>
           <p className="text-sm text-gray-600 leading-relaxed">Requires no complex cross-tab hooks or background workers. It's a standard feature of TanStack Query.</p>
         </div>
      </div>

      <section className="bg-white p-12 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-purple-600"></div>
         <h3 className="text-3xl font-black tracking-tighter mb-8 text-gray-900">The SWR Configuration</h3>
         <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 font-mono text-xs leading-relaxed text-purple-200">
           <p className="text-gray-500 mb-4">// In TransactionTablePolling.tsx</p>
           <p><span className="text-purple-400">const</span> result = <span className="text-yellow-400">useQuery</span>({"{"}</p>
           <p className="ml-4">queryKey: [<span className="text-green-400">'transactions'</span>],</p>
           <p className="ml-4 text-purple-300 font-bold">refetchInterval: 5000, // 5 seconds</p>
           <p className="ml-4">staleTime: 0,</p>
           <p>{"}"});</p>
         </div>
         <p className="mt-6 text-sm text-gray-500 italic">Note: In production, high-frequency polling can significantly increase server costs and database load.</p>
      </section>
    </div>
  );
}
