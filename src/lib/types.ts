export type ActionResult<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  validationErrors?: Record<string, string[]>;
};

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  status: 'pending' | 'completed';
  created_at: string;
}
