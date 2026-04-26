'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTransactions, deleteTransaction } from '@/actions/transaction.action';
import { useBroadcastSync } from '@/hooks/use-broadcast-sync';
import { useCallback, useEffect, useState } from 'react';
import { incrementRequestCount } from '@/hooks/use-request-counter';

export default function TransactionTable() {
  const queryClient = useQueryClient();
  const [isLeader, setIsLeader] = useState(false);
  const { broadcast } = useBroadcastSync();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      const result = await deleteTransaction(id);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        broadcast('REFETCH');
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert('Failed to delete transaction');
    }
  };

  // 1. LEADER ELECTION LOGIC
  useEffect(() => {
    const electionChannel = new BroadcastChannel('leader_election');
    const myId = Math.random().toString(36).substring(7);
    let leaderId: string | null = null;

    const claimLeadership = () => {
      leaderId = myId;
      setIsLeader(true);
      electionChannel.postMessage({ type: 'IAM_LEADER', id: myId });
    };

    electionChannel.onmessage = (msg) => {
      if (msg.data.type === 'IAM_LEADER') {
        if (msg.data.id !== myId) {
          leaderId = msg.data.id;
          setIsLeader(false);
        }
      } else if (msg.data.type === 'WHO_IS_LEADER') {
        if (isLeader) {
          electionChannel.postMessage({ type: 'IAM_LEADER', id: myId });
        }
      }
    };

    electionChannel.postMessage({ type: 'WHO_IS_LEADER' });
    const timeout = setTimeout(() => {
      if (!leaderId) claimLeadership();
    }, 500);

    return () => {
      electionChannel.close();
      clearTimeout(timeout);
    };
  }, [isLeader]);

  // 2. RECEIVER LOGIC
  const onSyncMessage = useCallback((msg: string) => {
    if (msg === 'REFETCH') {
      if (isLeader) {
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
      }
    }
  }, [queryClient, isLeader]);

  useBroadcastSync(onSyncMessage);

  // 3. FETCH LOGIC
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      incrementRequestCount('broadcast');
      const result = await getTransactions();
      if (!result.success) throw new Error(result.error);
      return result.data || [];
    },
    staleTime: 1000 * 60, 
  });

  if (isLoading && !data) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-[3px] border-blue-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-400 font-medium tracking-tight">Syncing Ledger...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
      <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Recent Activity</h2>
            {isLeader && (
              <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-black uppercase tracking-widest border border-amber-200">Leader</span>
            )}
          </div>
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Neon SQL Instance</p>
          </div>
        </div>
        <button 
          onClick={() => refetch()}
          className={`p-2.5 rounded-xl transition-all ${
            isRefetching ? 'bg-blue-50 text-blue-600' : 'bg-white border border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-200 shadow-sm'
          }`}
        >
          <svg className={`w-5 h-5 ${isRefetching ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto custom-scrollbar">
        {error && (
          <div className="p-8 text-center">
            <p className="text-sm text-red-500 bg-red-50 py-3 px-4 rounded-2xl inline-block font-medium border border-red-100">
              {error instanceof Error ? error.message : 'Connection failed'}
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
            <p className="text-gray-400 font-medium italic">No ledger entries found.</p>
          </div>
        ) : (
          data?.map((t, index) => (
            <div 
              key={t.id} 
              className={`p-6 transition-all flex justify-between items-center group relative ${
                t.status === 'pending' ? 'opacity-50 grayscale bg-gray-50/50' : 
                index % 2 === 0 ? 'bg-white hover:bg-gray-50/50' : 'bg-gray-50/30 hover:bg-gray-50/80'
              }`}
            >
              <div className="space-y-1">
                <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight flex items-center gap-2">
                  {t.description}
                  {t.status === 'pending' && (
                    <svg className="animate-spin h-3 w-3 text-blue-500" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-400 bg-white border border-gray-100 px-2 py-1 rounded-md font-black tracking-tighter">ID: {t.id}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right space-y-1.5">
                  <p className="text-xl font-black text-gray-900 tabular-nums tracking-tighter">
                    <span className="text-xs font-bold text-gray-300 mr-1">$</span>
                    {Number(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100/50 ${
                    t.status === 'pending' ? 'bg-blue-100 text-blue-700 animate-pulse' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {t.status}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleDelete(t.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Delete record"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
