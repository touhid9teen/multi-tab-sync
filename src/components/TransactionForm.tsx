'use client';

import { useState, useTransition } from 'react';
import { createTransaction } from '@/actions/transaction.action';

export default function TransactionForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount] = useState<string>('100');
  const [description, setDescription] = useState('Grocery shopping');
  
  const [errors, setErrors] = useState<{ general?: string; fields?: Record<string, string[]> }>({});
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(null);
    
    startTransition(async () => {
      const result = await createTransaction({ 
        amount: parseFloat(amount), 
        description 
      });

      if (!result.success) {
        setErrors({
          general: result.error,
          fields: result.validationErrors
        });
      } else {
        if (onSuccess) onSuccess();
        setSuccess(result.message || 'Success!');
        setAmount('');
        setDescription('');
        setTimeout(() => setSuccess(null), 3000);
      }
    });
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 max-w-md w-full transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">New Transaction</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-600 font-medium animate-in fade-in zoom-in-95 duration-300">
             <div className="flex gap-2">
               <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               {errors.general}
             </div>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-sm text-green-600 font-medium animate-in fade-in zoom-in-95 duration-300">
            <div className="flex gap-2">
               <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               {success}
             </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest px-1">Amount (USD)</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium group-focus-within:text-blue-500 transition-colors">$</span>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`block w-full pl-10 pr-4 py-4 rounded-2xl border bg-gray-50/50 text-gray-900 font-semibold focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all ${
                errors.fields?.amount ? 'border-red-300 ring-red-500/10' : 'border-gray-200'
              }`}
              placeholder="0.00"
              required
            />
          </div>
          {errors.fields?.amount && (
            <p className="mt-1 text-xs text-red-500 font-medium px-1">{errors.fields.amount[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest px-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`block w-full px-5 py-4 rounded-2xl border bg-gray-50/50 text-gray-900 font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all ${
              errors.fields?.description ? 'border-red-300 ring-red-500/10' : 'border-gray-200'
            }`}
            placeholder="What's this for?"
            required
          />
          {errors.fields?.description && (
            <p className="mt-1 text-xs text-red-500 font-medium px-1">{errors.fields.description[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-4 px-6 rounded-2xl text-white font-black tracking-tight transition-all shadow-lg active:scale-[0.98] ${
            isPending 
              ? 'bg-gray-400 cursor-not-allowed shadow-none' 
              : 'bg-gray-900 hover:bg-black shadow-gray-200 hover:shadow-gray-300'
          }`}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Submit Transaction'}
        </button>
      </form>
    </div>
  );
}
