// Based on API reference and inspection of viktor.ai/blog
export interface BlogPost {
  id: number;
  title: string;
  publication_date: string;
  slug: string;
  summary: string; // Assuming this field exists for the card
  featured_image?: {
    url: string;
  };
  author?: {
    name: string;
  };
  blogpost_categories?: {
    id: number;
    name: string;
  }[];
}

export interface BlogCategory {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface BlogQueryParameters {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  category_id?: number;
}