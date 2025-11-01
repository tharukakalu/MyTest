import { api } from './api';
import { Author, BlogCategory, BlogPost, BlogQueryParameters } from '../types/blog';

// Helper to build Strapi-like query params
const buildBlogParams = (params: Partial<BlogQueryParameters>) => {
  const { page, limit, search, sort, category_id } = params;
  
  const queryParams = new URLSearchParams();
  
  // Pagination
  if (limit) {
    queryParams.append('_limit', String(limit));
  }
  if (page && limit) {
    queryParams.append('_start', String((page - 1) * limit));
  }

  // Sorting
  queryParams.append('_sort', sort || 'publication_date:DESC');
  
  // Search
  if (search) {
    queryParams.append('title_contains', search);
  }
  
  // Filtering (Bonus)
  if (category_id) {
    queryParams.append('blogpost_categories.id', String(category_id));
  }

  return queryParams.toString();
};

export const fetchBlogPosts = async (params: BlogQueryParameters): Promise<BlogPost[]> => {
  const queryString = buildBlogParams(params);
  const response = await api.get<BlogPost[]>(`/blogposts?${queryString}`);
  return response.data;
};

export const fetchBlogPostsCount = async (params: Omit<BlogQueryParameters, 'page' | 'limit'>): Promise<number> => {
  // Build params but exclude pagination for the total count
  const queryString = buildBlogParams(params);
  const response = await api.get<number>(`/blogposts/count?${queryString}`);
  return response.data;
};

export const fetchBlogCategories = async (): Promise<BlogCategory[]> => {
  const response = await api.get<BlogCategory[]>('/blogpost-categories');
  return response.data;
};

export const fetchAuthors = async (): Promise<Author[]> => {
  const response = await api.get<Author[]>('/authors');
  return response.data;
};