'use client';

import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '@/actions/transaction.action';

export default function TransactionTablePolling() {
  const { data, isLoading, error, isRefetching } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const result = await getTransactions();
      if (!result.success) throw new Error(result.error);
      return result.data || [];
    },
    // The Core Polling Logic
    refetchInterval: 5000, 
    staleTime: 0, // Always fetch on interval
  });

  if (isLoading && !data) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-[3px] border-purple-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-400 font-medium tracking-tight">Initializing Polling...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
      {/* Visual Indicator of Fetching */}
      {isRefetching && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500 animate-pulse z-10"></div>
      )}

      <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Automated Ledger</h2>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></div>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">5s Interval Polling</p>
          </div>
        </div>
        <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
           <svg className={`w-5 h-5 ${isRefetching ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
           </svg>
        </div>
      </div>

      <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto custom-scrollbar">
        {error && (
          <div className="p-8 text-center">
            <p className="text-sm text-red-500 bg-red-50 py-3 px-4 rounded-2xl inline-block font-medium border border-red-100">
              {error instanceof Error ? error.message : 'Polling failed'}
            </p>
          </div>
        )}

        {(!data || data.length === 0) && !error ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-400 font-medium italic">Empty ledger.</p>
          </div>
        ) : (
          data?.map((t) => (
            <div key={t.id} className="p-6 hover:bg-gray-50/80 transition-all flex justify-between items-center group">
              <div className="space-y-1">
                <p className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors tracking-tight">{t.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-md font-black tracking-tighter">POLL: {t.id}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <div className="text-right space-y-1.5">
                <p className="text-xl font-black text-gray-900 tabular-nums tracking-tighter">
                  <span className="text-xs font-bold text-gray-300 mr-1">$</span>
                  {Number(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-purple-50 text-purple-600 uppercase tracking-widest border border-purple-100/50">
                   {t.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
