'use server';

import { sql } from '@/lib/db';
import { ActionResult, Transaction } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const TransactionSchema = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function initializeSchema() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        amount DECIMAL(12,2) NOT NULL,
        description TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
  } catch (error) {
    console.error('[DATABASE_INIT_ERROR]:', error);
    throw error;
  }
}

export async function createTransaction(rawData: unknown): Promise<ActionResult<Transaction>> {
  try {
    const validatedFields = TransactionSchema.safeParse(rawData);
    
    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Validation failed',
        validationErrors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { amount, description } = validatedFields.data;

    await initializeSchema();
    await delay(1000); // Forced Delay

    const id = Math.random().toString(36).substring(2, 9);
    const status = 'completed';

    const result = await sql`
      INSERT INTO transactions (id, amount, description, status)
      VALUES (${id}, ${amount}, ${description}, ${status})
      RETURNING id, amount, description, status, created_at
    `;

    const newTransaction = result[0] as Transaction;

    revalidatePath('/');
    
    return {
      success: true,
      data: newTransaction,
      message: 'Transaction saved to Neon DB',
    };

  } catch (error) {
    console.error('[ACTION_EXCEPTION]:', error);
    
    let errorMessage = 'An unexpected error occurred.';
    if (process.env.NODE_ENV === 'development') {
      const err = error as Error;
      errorMessage = `Database Error: ${err.message}`;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function getTransactions(): Promise<ActionResult<Transaction[]>> {
  try {
    await initializeSchema();
    const rows = await sql`
      SELECT id, amount, description, status, created_at 
      FROM transactions 
      ORDER BY created_at DESC 
      LIMIT 50
    `;

    return {
      success: true,
      data: rows as Transaction[],
    };

  } catch (error) {
    console.error('[FETCH_EXCEPTION]:', error);
    return {
      success: false,
      error: 'Failed to fetch transactions from Neon.',
    };
  }
}
export async function deleteTransaction(id: string): Promise<ActionResult<void>> {
  try {
    await sql`DELETE FROM transactions WHERE id = ${id}`;
    revalidatePath('/');
    return {
      success: true,
      message: 'Transaction deleted successfully',
    };
  } catch (error) {
    console.error('[DELETE_EXCEPTION]:', error);
    return {
      success: false,
      error: 'Failed to delete transaction',
    };
  }
}
