
import apiClient from '../apiClient';
import { BlogPost, BlogCategory, BlogPostRequest, BlogCategoryRequest } from '../models/blog.model';

const getBlogPosts = async (params?: { categoryId?: number; status?: string }): Promise<BlogPost[]> => {
  const response = await apiClient.get<BlogPost[]>('/blogs', { params });
  return response.data;
};

const getBlogPostById = async (id: number): Promise<BlogPost> => {
  const response = await apiClient.get<BlogPost>(`/blogs/${id}`);
  return response.data;
};

const createBlogPost = async (data: BlogPostRequest): Promise<BlogPost> => {
  const response = await apiClient.post<BlogPost>('/blogs', data);
  return response.data;
};

const updateBlogPost = async (id: number, data: BlogPostRequest): Promise<BlogPost> => {
  const response = await apiClient.put<BlogPost>(`/blogs/${id}`, data);
  return response.data;
};

const deleteBlogPost = async (id: number): Promise<void> => {
  await apiClient.delete(`/blogs/${id}`);
};

const getBlogCategories = async (): Promise<BlogCategory[]> => {
  const response = await apiClient.get<BlogCategory[]>('/blogs/categories');
  return response.data;
};

const createBlogCategory = async (data: BlogCategoryRequest): Promise<BlogCategory> => {
  const response = await apiClient.post<BlogCategory>('/blogs/categories', data);
  return response.data;
};

const updateBlogCategory = async (id: number, data: BlogCategoryRequest): Promise<BlogCategory> => {
  const response = await apiClient.put<BlogCategory>(`/blogs/categories/${id}`, data);
  return response.data;
};

const deleteBlogCategory = async (id: number): Promise<void> => {
  await apiClient.delete(`/blogs/categories/${id}`);
};

export const blogService = {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
