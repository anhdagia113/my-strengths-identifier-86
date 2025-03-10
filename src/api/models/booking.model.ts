
import { Service } from './service.model';
import { User } from './user.model';
import { Specialist } from './specialist.model';

export interface Booking {
  id: number;
  userId: number;
  user: User;
  specialistId: number;
  specialist: Specialist;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  services: Service[];
  totalPrice: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface BookingRequest {
  specialistId: number;
  date: string;
  startTime: string;
  serviceIds: number[];
  notes?: string;
}

export interface UpdateBookingStatusRequest {
  status: BookingStatus;
}
