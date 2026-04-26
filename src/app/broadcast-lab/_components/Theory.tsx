import React from 'react';

export default function Theory() {
  return (
    <div className="bg-white rounded-[32px] shadow-2xl shadow-indigo-100/50 border border-gray-100 p-12 space-y-12 overflow-hidden relative">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      {/* Header Section */}
      <section className="relative space-y-4">
        <div className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-200">
          The Tech Behind the Lab
        </div>
        <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">BroadcastChannel API: <br/>The "Invisible Event Bus"</h2>
        <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
          The BroadcastChannel API allows simple communication between browsing contexts (windows, tabs, frames, or workers) that share the same origin.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="p-8 bg-gray-50 rounded-[24px] border border-gray-100 space-y-4">
           <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
           </div>
           <h4 className="text-lg font-black text-gray-900 tracking-tight">Zero Server Load</h4>
           <p className="text-sm text-gray-500 leading-relaxed">Unlike WebSockets or SSE, this logic runs entirely in the browser. Tab A talks directly to Tab B without hitting your database or API.</p>
         </div>
         
         <div className="p-8 bg-gray-50 rounded-[24px] border border-gray-100 space-y-4">
           <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           </div>
           <h4 className="text-lg font-black text-gray-900 tracking-tight">Ultra Low Latency</h4>
           <p className="text-sm text-gray-500 leading-relaxed">Messages are dispatched instantly. Tab B usually receives the signal in less than 5ms, faster than the server can even respond.</p>
         </div>

         <div className="p-8 bg-gray-50 rounded-[24px] border border-gray-100 space-y-4">
           <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
           </div>
           <h4 className="text-lg font-black text-gray-900 tracking-tight">Same-Origin Security</h4>
           <p className="text-sm text-gray-500 leading-relaxed">Restricted by the browser to only talk to tabs on the exact same domain. Malicious sites can't listen in on your channel.</p>
         </div>
      </div>

      <section className="space-y-8 bg-gray-900 p-12 rounded-[32px] text-white">
         <h3 className="text-3xl font-black tracking-tighter">The Implementation Flow</h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center font-black text-sm italic">01</div>
                <h5 className="text-xl font-bold tracking-tight">The Transmitter (Tab A)</h5>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 font-mono text-xs leading-relaxed text-indigo-200">
                <p className="text-white/40 mb-2">// In TransactionForm.tsx</p>
                <p><span className="text-pink-400">const</span> channel = <span className="text-yellow-400">new</span> BroadcastChannel(<span className="text-green-400">'sync'</span>);</p>
                <p>channel.<span className="text-blue-400">postMessage</span>(<span className="text-green-400">'REFETCH'</span>);</p>
              </div>
              <p className="text-sm text-white/60">When a user submits the form, Tab A saves the data to Neon DB. Once successful, it screams "REFETCH" into the browser's shared channel.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-black text-sm italic text-black">02</div>
                <h5 className="text-xl font-bold tracking-tight">The Receiver (Tab B)</h5>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 font-mono text-xs leading-relaxed text-green-200">
                <p className="text-white/40 mb-2">// In TransactionTable.tsx</p>
                <p>channel.<span className="text-blue-400">onmessage</span> = (e) ={'>'} {"{"}</p>
                <p className="ml-4">queryClient.<span className="text-blue-400">invalidateQueries</span>([<span className="text-green-400">'txs'</span>]);</p>
                <p>{"}"};</p>
              </div>
              <p className="text-sm text-white/60">Tab B is constantly listening. When it hears the "REFETCH" command, it tells TanStack Query that its cached data is now "stale" and triggers a new fetch.</p>
            </div>
         </div>

         <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-indigo-400">Sync Completed in ~2ms • State Unified Across All Tabs</p>
         </div>
      </section>

      <div className="text-center p-12 border-2 border-dashed border-gray-100 rounded-[32px] space-y-4">
         <h4 className="text-2xl font-black text-gray-900 tracking-tight">Why use this instead of Polling?</h4>
         <p className="text-gray-500 max-w-2xl mx-auto">
           Polling is like checking your mailbox every 5 minutes. **BroadcastChannel** is like having a private walkie-talkie. It's more efficient, saves battery, reduces server cost, and provides a truly "Real-Time" user experience without the complexity of a Socket Server.
         </p>
      </div>
    </div>
  );
}
