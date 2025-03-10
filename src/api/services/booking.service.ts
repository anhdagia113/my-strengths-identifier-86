
import apiClient from '../apiClient';
import { Booking, BookingRequest, UpdateBookingStatusRequest } from '../models/booking.model';
import { Service } from '../models/service.model';
import { Specialist } from '../models/specialist.model';

const getBookings = async (): Promise<Booking[]> => {
  const response = await apiClient.get<Booking[]>('/bookings');
  return response.data;
};

const getBookingById = async (id: number): Promise<Booking> => {
  const response = await apiClient.get<Booking>(`/bookings/${id}`);
  return response.data;
};

const createBooking = async (data: BookingRequest): Promise<Booking> => {
  const response = await apiClient.post<Booking>('/bookings', data);
  return response.data;
};

const cancelBooking = async (id: number): Promise<void> => {
  await apiClient.put(`/bookings/${id}/cancel`);
};

const updateBookingStatus = async (id: number, data: UpdateBookingStatusRequest): Promise<Booking> => {
  const response = await apiClient.put<Booking>(`/bookings/${id}/status`, data);
  return response.data;
};

const getAvailableTimeSlots = async (
  specialistId: number,
  date: string
): Promise<string[]> => {
  const response = await apiClient.get<string[]>(
    `/bookings/available-time-slots?specialistId=${specialistId}&date=${date}`
  );
  return response.data;
};

const getAvailableServices = async (): Promise<Service[]> => {
  const response = await apiClient.get<Service[]>('/services?isActive=true');
  return response.data;
};

const getAvailableSpecialists = async (): Promise<Specialist[]> => {
  const response = await apiClient.get<Specialist[]>('/specialists?isActive=true');
  return response.data;
};

export const bookingService = {
  getBookings,
  getBookingById,
  createBooking,
  cancelBooking,
  updateBookingStatus,
  getAvailableTimeSlots,
  getAvailableServices,
  getAvailableSpecialists,
};
