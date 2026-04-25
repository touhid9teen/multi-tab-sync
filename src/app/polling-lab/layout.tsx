'use client';

import QueryProvider from "@/components/providers/QueryProvider";
import Link from "next/link";
import { useState, useEffect } from "react";
import SyncStatus from "@/components/SyncStatus";
import { useRequestCounter } from "@/hooks/use-request-counter";

export default function PollingLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nextFetch, setNextFetch] = useState(5);
  const requestCount = useRequestCounter('polling');

  useEffect(() => {
    const interval = setInterval(() => {
      setNextFetch((prev) => (prev <= 1 ? 5 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden font-sans">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all">
              <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-gray-300 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Portal</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                 </svg>
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900 tracking-tight">Polling Lab</h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Lab #3 • Background Fetch Sync</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end">
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Network Hits</p>
               <p className="text-sm font-black text-purple-600 tabular-nums">{requestCount}</p>
             </div>
             <div className="h-8 w-px bg-gray-100" />
             <div className="flex items-center gap-2 px-4 py-1.5 bg-purple-50 text-purple-700 text-[10px] font-black rounded-xl border border-purple-100 uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                Polling Active
             </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-10">
          {children}
        </main>
      </div>

      {/* Control Panel (Sidebar) */}
      <aside className="w-96 bg-white border-l border-gray-100 flex flex-col shrink-0 overflow-hidden">
        <div className="p-8 border-b border-gray-50 space-y-6">
          <h2 className="font-black text-gray-900 uppercase tracking-tighter flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Instrumentation
          </h2>
          <SyncStatus method="TanStack Polling" status="Healthy" />
        </div>

        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h2 className="font-black text-gray-900 uppercase tracking-tighter flex items-center gap-2 text-[10px]">
            Fetch Control
          </h2>
          <span className="text-[10px] bg-purple-600 text-white px-2 py-1 rounded-md font-black uppercase tracking-widest">Fallback</span>
        </div>
        
        <div className="flex-1 p-8 space-y-10">
           <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Network Pulse</label>
                <span className="text-2xl font-black text-purple-600 tabular-nums">{nextFetch}s</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                <div 
                  className="h-full bg-purple-600 transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(147,51,234,0.3)]"
                  style={{ width: `${(nextFetch / 5) * 100}%` }}
                ></div>
              </div>
           </div>

           <div className="p-6 bg-purple-50/50 rounded-3xl border border-purple-100 space-y-4">
              <h4 className="text-sm font-black text-purple-900 uppercase tracking-tight">The " mailbox" Strategy</h4>
              <p className="text-xs text-purple-700/70 leading-relaxed font-medium">
                Polling is the ultimate insurance policy. Even if the Event Bus fails or the Shared Worker crashes, the UI will always catch up with the server every 5 seconds.
              </p>
           </div>
        </div>

        <div className="p-8 border-t border-gray-50 bg-white text-center">
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
             High Server Load Potential <br/> 
             <span className="text-red-400 underline decoration-2 underline-offset-4">Use only as Fallback</span>
           </p>
        </div>
      </aside>
    </div>
  );
}
