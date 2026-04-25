'use client';

import Link from "next/link";
import { useRequestCounter, resetRequestCounters } from "@/hooks/use-request-counter";

export default function Home() {
  const broadcastRequests = useRequestCounter('broadcast');
  const workerRequests = useRequestCounter('worker');
  const pollingRequests = useRequestCounter('polling');

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 lg:p-24 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100 shadow-sm">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Sync Labs v1.0
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">
            Multi-Tab <br/>Synchronization
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            A high-performance laboratory exploring advanced browser synchronization strategies for modern web applications.
          </p>
        </div>

        {/* Real-time Analytics Dashboard */}
        <section className="bg-white rounded-[40px] p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.05)] border border-gray-100">
           <div className="flex justify-between items-end mb-12">
             <div className="space-y-1">
               <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic">Live Efficiency Metrics</h2>
               <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Network Overhead Comparison</p>
             </div>
             <button 
               onClick={resetRequestCounters}
               className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-all"
             >
               Reset Counters
             </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Broadcast Lab</span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-black uppercase tracking-widest border border-blue-100">Optimized</span>
                </div>
                <div className="space-y-1">
                  <div className="text-5xl font-black text-gray-900 tabular-nums tracking-tighter">{broadcastRequests}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">API Requests</div>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-500" style={{ width: `${Math.min(100, (broadcastRequests / Math.max(1, pollingRequests)) * 100)}%` }}></div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Worker Lab</span>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-900 rounded text-[10px] font-black uppercase tracking-widest border border-indigo-100">Centralized</span>
                </div>
                <div className="space-y-1">
                  <div className="text-5xl font-black text-gray-900 tabular-nums tracking-tighter">{workerRequests}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">API Requests</div>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-900 shadow-[0_0_10px_rgba(49,46,129,0.5)] transition-all duration-500" style={{ width: `${Math.min(100, (workerRequests / Math.max(1, pollingRequests)) * 100)}%` }}></div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Polling Lab</span>
                  <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-black uppercase tracking-widest border border-red-100">Fallback</span>
                </div>
                <div className="space-y-1">
                  <div className="text-5xl font-black text-gray-900 tabular-nums tracking-tighter">{pollingRequests}</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">API Requests</div>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)] transition-all duration-500" style={{ width: '100%' }}></div>
                </div>
              </div>
           </div>
        </section>

        {/* Lab Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/broadcast-lab" className="group p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">BroadcastChannel</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Single-origin event bus. Best for instant, decentralized synchronization between same-origin tabs.
              </p>
            </div>
          </Link>

          <Link href="/worker-lab" className="group p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-900 rounded-2xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Shared Workers</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Centralized background threads. Ideal for complex state management and resource pooling across tabs.
              </p>
            </div>
          </Link>

          <Link href="/polling-lab" className="group p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">TanStack Polling</h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed">
                Stale-while-revalidate fallback. Guarantees synchronization when modern browser APIs are unavailable.
              </p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
