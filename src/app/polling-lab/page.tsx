export default function PollingLabPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center space-y-6">
        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-gray-900">The "Stale-While-Revalidate Sync"</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Explore robust synchronization using periodic background fetches. Perfect for slow networks or browsers with restricted background APIs.
          </p>
        </div>
        <div className="inline-flex items-center px-4 py-2 bg-yellow-50 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-widest border border-yellow-100">
          Coming Soon: TanStack Polling Implementation
        </div>
      </div>
    </div>
  );
}
