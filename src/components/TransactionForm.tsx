'use client';

import { useState, useTransition } from 'react';
import { createTransaction } from '@/actions/transaction.action';

export default function TransactionForm() {
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount] = useState<string>('100');
  const [description, setDescription] = useState('Grocery shopping');
  
  // Professional State Management
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
        setSuccess(result.message || 'Success!');
        setAmount('');
        setDescription('');
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      }
    });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 max-w-md w-full transition-all">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">New Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Error Alert */}
        {errors.general && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 animate-in fade-in slide-in-from-top-1">
            {errors.general}
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="p-3 bg-green-50 border border-green-100 rounded-lg text-sm text-green-600 animate-in fade-in slide-in-from-top-1">
            {success}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">$</span>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`block w-full pl-8 pr-4 py-2.5 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${
                errors.fields?.amount ? 'border-red-300' : 'border-gray-200'
              }`}
              required
            />
          </div>
          {errors.fields?.amount && (
            <p className="mt-1 text-xs text-red-500">{errors.fields.amount[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`block w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all ${
              errors.fields?.description ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="e.g. Monthly Rent"
            required
          />
          {errors.fields?.description && (
            <p className="mt-1 text-xs text-red-500">{errors.fields.description[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 px-4 rounded-lg text-white font-bold transition-all transform active:scale-[0.98] ${
            isPending 
              ? 'bg-blue-400 cursor-not-allowed shadow-none' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
          }`}
        >
          {isPending ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Securing Transaction...
            </span>
          ) : 'Create Transaction'}
        </button>
      </form>
    </div>
  );
}
