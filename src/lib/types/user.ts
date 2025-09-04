import { BaseEntity, Address } from "./common";

// Re-export from auth types for consistency
export { User, UserPreferences } from "./auth";

// Additional user-related types for admin management
export interface UserProfile extends BaseEntity {
  userId: string;
  bio?: string;
  website?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  interests?: string[];
  newsletter: boolean;
  marketingEmails: boolean;
}

export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: string;
  joinedDate: string;
  loyaltyPoints: number;
  referrals: number;
}

export interface UserActivity extends BaseEntity {
  userId: string;
  action: string;
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface UserAddress extends Address {
  userId: string;
  user?: User;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  role?: string;
  status?: "active" | "inactive";
  emailVerified?: boolean;
  phoneVerified?: boolean;
  search?: string;
  joinedFrom?: string;
  joinedTo?: string;
  sortBy?:
    | "name"
    | "email"
    | "createdAt"
    | "lastLoginAt"
    | "totalOrders"
    | "totalSpent";
  sortOrder?: "asc" | "desc";
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "user" | "admin" | "moderator";
  isActive?: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  role?: "user" | "admin" | "moderator";
  isActive?: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
}

// Customer management types for admin
export interface CustomerSummary {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  status: "active" | "inactive";
  createdAt: string;
}
