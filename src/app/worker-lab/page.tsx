export default function WorkerLabPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-gray-900">The "Centralized Browser Hub"</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Experience synchronization powered by a single background instance. No matter how many tabs you open, they all talk to the same Worker.
          </p>
        </div>
        <div className="inline-flex items-center px-4 py-2 bg-yellow-50 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-widest border border-yellow-100">
          Coming Soon: Shared Worker Implementation
        </div>
      </div>
    </div>
  );
}
