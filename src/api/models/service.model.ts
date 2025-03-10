
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  categoryId: number;
  category: ServiceCategory;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceRequest {
  name: string;
  description: string;
  price: number;
  duration: number;
  categoryId: number;
  image?: string;
  isActive: boolean;
}

export interface ServiceCategoryRequest {
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
}
