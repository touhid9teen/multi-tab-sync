'use client';

export default function WorkerLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden font-sans">
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">Shared Worker Lab</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Lab #2 • Centralized Hub Sync</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black rounded-xl border border-indigo-100 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Worker Active
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-10">
          {children}
        </main>
      </div>

      <aside className="w-96 bg-white border-l border-gray-100 flex flex-col shrink-0 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h2 className="font-black text-gray-900 uppercase tracking-tighter flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            Hub Activity
          </h2>
          <span className="text-[10px] bg-indigo-900 text-white px-2 py-1 rounded-md font-black uppercase tracking-widest">Worker</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs custom-scrollbar" id="worker-log-container">
          <div className="text-gray-400 italic text-center py-20 px-8 border-2 border-dashed border-gray-100 rounded-3xl">
            <svg className="w-8 h-8 mx-auto mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Waiting for hub messages...
          </div>
        </div>

        <div className="p-6 border-t border-gray-50">
           <button 
             onClick={() => {
               const container = document.getElementById('worker-log-container');
               if (container) container.innerHTML = '';
             }}
             className="w-full py-4 text-xs font-black text-gray-400 hover:text-red-500 transition-all uppercase tracking-widest border border-gray-100 rounded-2xl hover:border-red-100 hover:bg-red-50"
           >
             Flush Hub Logs
           </button>
        </div>
      </aside>
    </div>
  );
}
