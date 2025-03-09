
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
