import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

export const sql = neon(process.env.DATABASE_URL);

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  status: 'pending' | 'completed';
  created_at: Date;
}
