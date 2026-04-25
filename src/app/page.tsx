import * as Tabs from "@radix-ui/react-tabs";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-12 px-6 bg-gray-50">
      <div className="w-full max-w-5xl flex flex-col items-center gap-12">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            Multi-Tab Sync Demo
          </h1>
          <p className="text-gray-500 font-medium">Powered by Next.js 15 & Neon PostgreSQL</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {/* Form Section */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 px-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Create Entry
            </h2>
            <TransactionForm />
          </div>

          {/* List Section */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 px-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              Live Database
            </h2>
            <TransactionList />
          </div>

          {/* Docs/Status Section */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 px-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              System Architecture
            </h2>
            <Tabs.Root className="w-full bg-white rounded-xl shadow-lg border border-gray-100 p-2" defaultValue="tab1">
              <Tabs.List className="flex p-1 bg-gray-100 rounded-lg mb-4">
                <Tabs.Trigger
                  value="tab1"
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
                >
                  Storage
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="tab2"
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
                >
                  Network
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="tab1" className="p-4 space-y-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Data is now persisted in <span className="font-bold text-indigo-600">Neon PostgreSQL</span>. 
                  Even if you refresh or restart the server, your transactions will remain.
                </p>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-700 font-mono">
                  TABLE: transactions <br/>
                  ENGINE: Serverless Postgres
                </div>
              </Tabs.Content>

              <Tabs.Content value="tab2" className="p-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Server Actions handle the communication. The 1s latency simulation ensures 
                  your UI logic correctly handles asynchronous state updates across tabs.
                </p>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </main>
  );
}
