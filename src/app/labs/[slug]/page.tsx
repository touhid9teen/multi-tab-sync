'use client';

import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import * as Tabs from "@radix-ui/react-tabs";
import { useBroadcastSync } from "@/hooks/use-broadcast-sync";
import { useWorkerSync } from "@/hooks/use-worker-sync";
import BackToHome from "@/components/BackToHome";

// Broadcast Components
import BroadcastDashboard from "./_components/broadcast/Dashboard";
import BroadcastTheory from "./_components/broadcast/Theory";

// Polling Components
import PollingDashboard from "./_components/polling/Dashboard";
import PollingTheory from "./_components/polling/Theory";

// Worker Components
import WorkerDashboard from "./_components/worker/Dashboard";
import WorkerTheory from "./_components/worker/Theory";

export default function LabPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const { broadcast: broadcastSync } = useBroadcastSync();
  const { broadcast: workerSync } = useWorkerSync();

  if (slug === 'broadcast-lab') {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-8 lg:p-24 font-sans">
        <div className="max-w-6xl mx-auto space-y-8">
          <BackToHome />
          <Tabs.Root defaultValue="dashboard" className="w-full">
            <Tabs.List className="flex p-1 bg-gray-200/50 rounded-2xl mb-8 w-fit backdrop-blur-md">
              <Tabs.Trigger value="dashboard" className="px-8 py-3 text-sm font-black rounded-xl text-gray-500 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-xl transition-all duration-300">Dashboard</Tabs.Trigger>
              <Tabs.Trigger value="sync-logs" className="px-8 py-3 text-sm font-black rounded-xl text-gray-500 data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-xl transition-all duration-300">Detailed Sync Logic</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="dashboard" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              <BroadcastDashboard onBroadcast={broadcastSync} />
            </Tabs.Content>
            <Tabs.Content value="sync-logs" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              <BroadcastTheory />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    );
  }

  if (slug === 'polling-lab') {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-8 lg:p-24 font-sans">
        <div className="max-w-6xl mx-auto space-y-8">
          <BackToHome />
          <Tabs.Root defaultValue="dashboard" className="w-full">
            <Tabs.List className="flex p-1 bg-gray-200/50 rounded-2xl mb-8 w-fit backdrop-blur-md">
              <Tabs.Trigger value="dashboard" className="px-8 py-3 text-sm font-black rounded-xl text-gray-500 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-xl transition-all duration-300">Polling Dashboard</Tabs.Trigger>
              <Tabs.Trigger value="polling-logic" className="px-8 py-3 text-sm font-black rounded-xl text-gray-500 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-xl transition-all duration-300">Polling Logic</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="dashboard" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              <PollingDashboard />
            </Tabs.Content>
            <Tabs.Content value="polling-logic" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              <PollingTheory />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    );
  }

  if (slug === 'worker-lab') {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-8 lg:p-24 font-sans">
        <div className="max-w-6xl mx-auto space-y-8">
          <BackToHome />
          <Tabs.Root defaultValue="dashboard" className="w-full">
            <Tabs.List className="flex p-1 bg-gray-200/50 rounded-2xl mb-8 w-fit backdrop-blur-md">
              <Tabs.Trigger value="dashboard" className="px-8 py-3 text-sm font-black rounded-xl text-gray-500 data-[state=active]:bg-white data-[state=active]:text-indigo-900 data-[state=active]:shadow-xl transition-all duration-300">Hub Dashboard</Tabs.Trigger>
              <Tabs.Trigger value="worker-logic" className="px-8 py-3 text-sm font-black rounded-xl text-gray-500 data-[state=active]:bg-white data-[state=active]:text-indigo-900 data-[state=active]:shadow-xl transition-all duration-300">Worker Logic</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="dashboard" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              <WorkerDashboard onBroadcast={workerSync} />
            </Tabs.Content>
            <Tabs.Content value="worker-logic" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              <WorkerTheory />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    );
  }

  return notFound();
}
