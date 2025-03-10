
export type PaymentStatus = 'COMPLETED' | 'PENDING' | 'FAILED' | 'REFUNDED';

export type PaymentMethodType = 'credit_card' | 'bank';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
  expiry: string;
  isDefault: boolean;
}

export interface PaymentMethodRequest {
  type: PaymentMethodType;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

export interface Transaction {
  id: string;
  date: string;
  service: string;
  amount: number;
  status: PaymentStatus;
  paymentMethod: string;
}

export interface Payment {
  id: number;
  transactionId: string;
  amount: number;
  paymentDate: string;
  status: PaymentStatus;
  paymentMethod: string;
  description: string;
  userId: number;
}

export interface PaymentResponse {
  content: Payment[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
