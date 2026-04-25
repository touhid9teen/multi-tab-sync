'use client';

import QueryProvider from "@/components/providers/QueryProvider";
import Link from "next/link";
import SyncStatus from "@/components/SyncStatus";
import { useRequestCounter } from "@/hooks/use-request-counter";

export default function BroadcastLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestCount = useRequestCounter('broadcast');

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
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
              <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900 tracking-tight">Broadcast Lab</h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Lab #1 • Event Bus Sync</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex flex-col items-end">
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Global Requests</p>
               <p className="text-sm font-black text-blue-600 tabular-nums">{requestCount}</p>
             </div>
             <div className="h-8 w-px bg-gray-100" />
             <div className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-full border border-green-100 flex items-center gap-1.5 uppercase tracking-widest">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
               Live Session
             </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-10">
          {children}
        </main>
      </div>

      {/* Sync Log Panel (Sidebar) */}
      <aside className="w-96 bg-white border-l border-gray-100 flex flex-col shrink-0 overflow-hidden">
        <div className="p-8 border-b border-gray-50 space-y-6">
          <h2 className="font-black text-gray-900 uppercase tracking-tighter flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Instrumentation
          </h2>
          <SyncStatus method="BroadcastChannel" status="Healthy" />
        </div>
        
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Event Bus Log</span>
           <span className="text-[10px] bg-gray-900 text-white px-2 py-1 rounded-md font-black uppercase tracking-widest">Console</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs custom-scrollbar bg-gray-50/10" id="sync-log-container">
          <div className="text-gray-400 italic text-center py-20 px-8 border-2 border-dashed border-gray-100 rounded-3xl">
            <svg className="w-8 h-8 mx-auto mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Listening for cross-tab broadcast events...
          </div>
        </div>

        <div className="p-6 border-t border-gray-50 bg-white">
           <button 
             onClick={() => {
               const container = document.getElementById('sync-log-container');
               if (container) container.innerHTML = '';
             }}
             className="w-full py-3 text-xs font-black text-gray-400 hover:text-red-500 transition-all uppercase tracking-widest border border-gray-100 rounded-2xl hover:border-red-100 hover:bg-red-50"
           >
             Clear Console
           </button>
        </div>
      </aside>
    </div>
  );
}
