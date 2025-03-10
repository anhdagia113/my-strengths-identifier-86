
export interface Transaction {
  id: number;
  transactionId: string;
  amount: number;
  paymentDate: string;
  status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
  paymentMethod: string;
  description: string;
  userId?: number;
}

export interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  expiry: string;
  isDefault: boolean;
}

export interface PaymentMethodRequest {
  type: string;
  cardNumber?: string;
  cardName?: string;
  expiry?: string;
  bankAccount?: string;
  bankName?: string;
  isDefault?: boolean;
}

export interface CreateTransactionRequest {
  amount: number;
  paymentMethodId: string;
  description: string;
}

export interface PaymentStatus {
  COMPLETED: string;
  PENDING: string;
  FAILED: string;
  REFUNDED: string;
}

export const PAYMENT_STATUSES: PaymentStatus = {
  COMPLETED: "COMPLETED",
  PENDING: "PENDING",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED"
};
