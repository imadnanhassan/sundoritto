// Base response structure
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error response structure
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

// Pagination parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Sort parameters
export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Search parameters
export interface SearchParams {
  search?: string;
}

// Date range parameters
export interface DateRangeParams {
  startDate?: string;
  endDate?: string;
}

// File upload structure
export interface FileUpload {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimetype: string;
  createdAt: string;
}

// Address structure
export interface Address {
  id?: string;
  type: "billing" | "shipping";
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Status types
export type Status = "active" | "inactive" | "pending" | "deleted";

// Role types
export type Role = "user" | "admin" | "moderator";

// Currency type
export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

// Meta data for SEO
export interface SEOMetadata {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  tag?: string[];
  focusKeyword?: string;
}
