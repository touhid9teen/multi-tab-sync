'use server';

import { sql } from '@/lib/db';
import { ActionResult, Transaction } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// 1. Define Validation Schema
const TransactionSchema = z.object({
  amount: z.number().positive('Amount must be greater than 0').max(1000000, 'Amount is too large'),
  description: z.string().min(3, 'Description must be at least 3 characters').max(200, 'Description is too long'),
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Ensures the database schema is ready.
 * In a production app, you'd use a migration tool (like Drizzle or Prisma),
 * but for this demo, we handle it gracefully here.
 */
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
    throw new Error('Database initialization failed');
  }
}

/**
 * Creates a new transaction with validation and professional error handling.
 */
export async function createTransaction(rawData: unknown): Promise<ActionResult<Transaction>> {
  console.log('[ACTION]: createTransaction started');

  try {
    // A. Input Validation
    const validatedFields = TransactionSchema.safeParse(rawData);
    
    if (!validatedFields.success) {
      return {
        success: false,
        error: 'Validation failed',
        validationErrors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { amount, description } = validatedFields.data;

    // B. Initialization & Latency Simulation
    await initializeSchema();
    await delay(1000); // Forced delay for UI pending state testing

    const id = Math.random().toString(36).substring(2, 9);
    const status = 'completed';

    // C. Database Operation
    const result = await sql`
      INSERT INTO transactions (id, amount, description, status)
      VALUES (${id}, ${amount}, ${description}, ${status})
      RETURNING id, amount, description, status, created_at
    `;

    const newTransaction = result[0] as Transaction;

    console.log('[ACTION]: createTransaction success', id);
    
    revalidatePath('/');
    
    return {
      success: true,
      data: newTransaction,
      message: 'Transaction created successfully',
    };

  } catch (error) {
    // D. Global Exception Handling
    console.error('[ACTION_EXCEPTION]:', error);
    
    return {
      success: false,
      error: 'An unexpected error occurred while creating the transaction. Please try again.',
    };
  }
}

/**
 * Fetches transactions with standardized error response.
 */
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
      error: 'Failed to load transactions from the database.',
    };
  }
}
