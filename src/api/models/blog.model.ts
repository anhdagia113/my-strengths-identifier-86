
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  authorId: number;
  author: string;
  categoryId: number;
  category: BlogCategory;
  readTime: number;
  publishDate: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostRequest {
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  categoryId: number;
  readTime: number;
  status: 'DRAFT' | 'PUBLISHED';
}

export interface BlogCategoryRequest {
  name: string;
  description?: string;
}
