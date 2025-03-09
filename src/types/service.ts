
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  duration?: number; // Duration in minutes
  category?: string; // Service category
}

// Specialist type
export interface Specialist {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  bio?: string;
  availability?: string[];
}

// Booking type
export interface Booking {
  id: string;
  service: string;
  specialist: string;
  date: string;
  status: string;
  price: number;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  paymentMethod?: string;
  notes?: string;
}

// Transaction type
export interface Transaction {
  id: string;
  date: string;
  service: string;
  amount: number;
  status: string;
  paymentMethod: string;
  bookingId?: string;
}

// Payment Method type
export interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  expiry?: string;
  isDefault: boolean;
}

// Invoice type
export interface Invoice {
  id: string;
  date: string;
  service: string;
  amount: number;
  status: string;
  transactionId: string;
}
