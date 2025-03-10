
export interface Specialist {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  profileImage?: string;
  specialties: string[];
  rating: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SpecialistAvailability {
  id: number;
  specialistId: number;
  dayOfWeek: number; // 0-6 for Sunday to Saturday
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
}

export interface SpecialistRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  profileImage?: string;
  specialties: string[];
  isActive: boolean;
}

export interface AvailabilityRequest {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}
