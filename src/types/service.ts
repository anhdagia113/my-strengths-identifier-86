
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  duration?: number; // Optional duration in minutes
  category?: string; // Optional category
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
