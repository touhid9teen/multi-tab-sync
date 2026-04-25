'use client';

import { useEffect, useState, useCallback } from 'react';
import { getTransactions } from '@/actions/transaction.action';
import { Transaction } from '@/lib/types';

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    const result = await getTransactions();
    
    if (result.success && result.data) {
      setTransactions(result.data);
      setError(null);
    } else {
      setError(result.error || 'Failed to fetch transactions');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTransactions();
    
    // Polling for demo purposes
    const interval = setInterval(fetchTransactions, 5000);
    return () => clearInterval(interval);
  }, [fetchTransactions]);

  if (loading && transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mb-2"></div>
        <p className="text-gray-500 text-sm">Syncing with Neon DB...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-gray-800">Live Ledger</h2>
          <p className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">Neon SQL Instance</p>
        </div>
        <button 
          onClick={fetchTransactions}
          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          title="Refresh Ledger"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="divide-y divide-gray-50 max-h-[450px] overflow-y-auto custom-scrollbar">
        {error && (
          <div className="p-4 text-center">
            <p className="text-sm text-red-500 bg-red-50 py-2 px-3 rounded-lg inline-block">{error}</p>
          </div>
        )}

        {transactions.length === 0 && !error ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm italic">No entries yet.</p>
          </div>
        ) : (
          transactions.map((t) => (
            <div key={t.id} className="p-4 hover:bg-blue-50/30 transition-colors flex justify-between items-center group">
              <div className="space-y-0.5">
                <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{t.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">#{t.id}</span>
                  <span className="text-[10px] text-gray-500">{new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-900 tracking-tight">
                  <span className="text-xs font-normal text-gray-400 mr-0.5">$</span>
                  {Number(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-tighter">
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
