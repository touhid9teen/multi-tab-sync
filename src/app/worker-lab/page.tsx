'use client';

import * as Tabs from "@radix-ui/react-tabs";
import { useWorkerSync } from "@/hooks/use-worker-sync";
import Dashboard from "./_components/Dashboard";
import Theory from "./_components/Theory";

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
          <Dashboard onBroadcast={broadcast} />
        </Tabs.Content>

        <Tabs.Content value="worker-logic" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
          <Theory />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
