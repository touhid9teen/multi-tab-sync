'use client';

import * as Tabs from "@radix-ui/react-tabs";
import TransactionForm from "@/components/TransactionForm";
import TransactionTableWorker from "@/components/TransactionTableWorker";
import { useWorkerSync } from "@/hooks/use-worker-sync";

export default function WorkerLabPage() {
  const { broadcast } = useWorkerSync();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Tabs.Root defaultValue="dashboard" className="w-full">
        <Tabs.List className="flex p-1 bg-gray-200/50 rounded-2xl mb-8 w-fit backdrop-blur-md">
          <Tabs.Trigger
            value="dashboard"
            className="px-8 py-3 text-sm font-black rounded-xl text-gray-500 data-[state=active]:bg-white data-[state=active]:text-indigo-900 data-[state=active]:shadow-xl transition-all duration-300"
          >
            Hub Dashboard
          </Tabs.Trigger>
          <Tabs.Trigger
            value="worker-logic"
            className="px-8 py-3 text-sm font-black rounded-xl text-gray-500 data-[state=active]:bg-white data-[state=active]:text-indigo-900 data-[state=active]:shadow-xl transition-all duration-300"
          >
            Worker Logic
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="dashboard" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="px-2 flex justify-between items-end">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Submit to Hub</h3>
                <span className="text-[10px] text-indigo-900 font-bold bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">Worker Dispatcher</span>
              </div>
              <TransactionForm onSuccess={() => broadcast('REFETCH')} />
            </div>
            <div className="space-y-6">
              <div className="px-2 flex justify-between items-end">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Centralized Ledger</h3>
                <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">Hub Listener</span>
              </div>
              <TransactionTableWorker />
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="worker-logic" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
          <div className="bg-white rounded-[32px] shadow-2xl shadow-indigo-100/50 border border-gray-100 p-12 space-y-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-900/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <section className="relative space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-200">
                The Centralized Hub
              </div>
              <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-none">Shared Workers: <br/>One Thread to Rule Them All</h2>
              <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
                Shared Workers allow multiple tabs from the same origin to share a single background script, enabling centralized state and resource management.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-indigo-50/30 rounded-[24px] border border-indigo-100/50 space-y-4">
                 <h4 className="text-lg font-black text-indigo-900 tracking-tight">Persistence</h4>
                 <p className="text-sm text-gray-600 leading-relaxed">Unlike a standard Worker, a Shared Worker lives as long as at least one tab is open. It acts as a long-running "Server" inside the user's browser.</p>
               </div>
               
               <div className="p-8 bg-indigo-50/30 rounded-[24px] border border-indigo-100/50 space-y-4">
                 <h4 className="text-lg font-black text-indigo-900 tracking-tight">Port Communication</h4>
                 <p className="text-sm text-gray-600 leading-relaxed">Each tab connects to the worker via a 'MessagePort'. The worker maintains a list of these ports to broadcast updates globally.</p>
               </div>
            </div>

            <section className="bg-indigo-950 p-12 rounded-[32px] text-white">
               <h3 className="text-3xl font-black tracking-tighter mb-8 text-indigo-200">The Dispatcher Logic</h3>
               <div className="bg-black/40 p-8 rounded-2xl border border-white/5 font-mono text-xs leading-relaxed text-indigo-100">
                 <p className="text-white/30 mb-4">// In public/workers/sync-worker.js</p>
                 <p><span className="text-indigo-400">self</span>.<span className="text-yellow-400">onconnect</span> = (e) ={'>'} {"{"}</p>
                 <p className="ml-4"><span className="text-indigo-400">const</span> port = e.ports[<span className="text-orange-400">0</span>];</p>
                 <p className="ml-4">ports.<span className="text-blue-400">add</span>(port);</p>
                 <p className="ml-4 mt-2">port.<span className="text-blue-400">onmessage</span> = (msg) ={'>'} {"{"}</p>
                 <p className="ml-8 text-white/50">// Echo message to every other connected tab</p>
                 <p className="ml-8">ports.<span className="text-blue-400">forEach</span>(p ={'>'} p.<span className="text-blue-400">postMessage</span>(msg.data));</p>
                 <p className="ml-4">{"}"};</p>
                 <p>{"}"};</p>
               </div>
            </section>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
