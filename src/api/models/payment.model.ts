
export interface Payment {
  id: number;
  userId: number;
  bookingId: number;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  receiptUrl?: string;
  createdAt: string;
}

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CREDIT_CARD' | 'PAYPAL' | 'BANK_TRANSFER' | 'CASH';

export interface PaymentMethod {
  id: number;
  userId: number;
  type: 'CREDIT_CARD' | 'BANK_ACCOUNT';
  lastFour?: string;
  cardType?: string;
  expiryMonth?: number;
  expiryYear?: number;
  bankName?: string;
  accountNumber?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface PaymentRequest {
  bookingId: number;
  amount: number;
  method: PaymentMethod;
}

export interface PaymentMethodRequest {
  type: 'CREDIT_CARD' | 'BANK_ACCOUNT';
  cardNumber?: string;
  cardHolderName?: string;
  expiryMonth?: number;
  expiryYear?: number;
  cvv?: string;
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  isDefault: boolean;
}
