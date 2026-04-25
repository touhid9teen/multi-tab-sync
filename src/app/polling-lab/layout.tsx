export default function PollingLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
            Polling Lab
          </h1>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
               </span>
               <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Polling Active</span>
             </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

      <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-bold text-gray-800">Fetch Control</h2>
        </div>
        <div className="flex-1 p-4 space-y-6">
           <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Refetch Interval</label>
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-2xl font-black text-gray-900">5s</span>
                 <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded uppercase">Stale-Time</span>
               </div>
               <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                 <div className="h-full bg-purple-600 w-1/3"></div>
               </div>
             </div>
           </div>
           <p className="text-xs text-gray-500 leading-relaxed px-2">
             Polling is the ultimate fallback. It ensures that even without tab-to-tab communication, the UI remains eventually consistent with the server.
           </p>
        </div>
      </aside>
    </div>
  );
}
