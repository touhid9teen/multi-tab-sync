'use client';

import * as Tabs from "@radix-ui/react-tabs";
import { useBroadcastSync } from "@/hooks/use-broadcast-sync";
import Theory from "./_components/Theory";
import Dashboard from "./_components/Dashboard";

export default function BroadcastLabPage() {
  const { broadcast } = useBroadcastSync();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Tabs.Root defaultValue="dashboard" className="w-full">
        <Tabs.List className="flex p-1 bg-gray-200/50 rounded-2xl mb-8 w-fit backdrop-blur-md">
          <Tabs.Trigger
            value="dashboard"
            className="px-8 py-3 text-sm font-black rounded-xl text-gray-500 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-xl transition-all duration-300"
          >
            Dashboard
          </Tabs.Trigger>
          <Tabs.Trigger
            value="sync-logs"
            className="px-8 py-3 text-sm font-black rounded-xl text-gray-500 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-xl transition-all duration-300"
          >
            Detailed Sync Logic
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="dashboard" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
          <Dashboard onBroadcast={broadcast} />
        </Tabs.Content>

        <Tabs.Content value="sync-logs" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
          <Theory />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
