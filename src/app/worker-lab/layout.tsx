export default function WorkerLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-3 h-3 bg-indigo-600 rounded-full"></span>
            Shared Worker Lab
          </h1>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            Status: <span className="text-green-600 font-bold uppercase tracking-tighter">Connected to Hub</span>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

      <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-bold text-gray-800">Connection Status</h2>
        </div>
        <div className="flex-1 p-4 space-y-4">
           <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 space-y-2">
             <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Active Clients</p>
             <p className="text-3xl font-black text-indigo-900">2 Tabs</p>
           </div>
           <p className="text-xs text-gray-500 italic px-2">
             Shared Workers provide a single background thread that remains active as long as at least one tab is open.
           </p>
        </div>
      </aside>
    </div>
  );
}
