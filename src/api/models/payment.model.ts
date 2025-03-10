
export interface Transaction {
  id: string;
  date: string;
  service: string;
  amount: number;
  status: string;
  paymentMethod: string;
}

export interface PaymentMethodType {
  id: string;
  type: 'credit_card' | 'bank';
  name: string;
  expiry?: string;
  isDefault: boolean;
}

export const PAYMENT_STATUSES = {
  COMPLETED: 'completed',
  PENDING: 'pending',
  FAILED: 'failed',
  REFUNDED: 'refunded'
} as const;
