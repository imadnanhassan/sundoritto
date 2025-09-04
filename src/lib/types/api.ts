import {
  ApiResponse,
  ApiError,
  PaginationParams,
  SortParams,
  SearchParams,
} from "./common";

// Generic API request types
export interface CreateRequest<T> {
  data: Omit<T, "id" | "createdAt" | "updatedAt">;
}

export interface UpdateRequest<T> {
  id: string;
  data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>;
}

export interface DeleteRequest {
  id: string;
}

// Query parameters for list endpoints
export interface ListQueryParams
  extends PaginationParams,
    SortParams,
    SearchParams {
  filters?: Record<string, any>;
  include?: string[];
  fields?: string[];
}

// Bulk operations
export interface BulkDeleteRequest {
  ids: string[];
}

export interface BulkUpdateRequest<T> {
  ids: string[];
  data: Partial<T>;
}

// API endpoint paths
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
    CHANGE_PASSWORD: "/auth/change-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },

  // Product endpoints
  PRODUCTS: {
    LIST: "/products",
    DETAIL: "/products/:id",
    CREATE: "/products",
    UPDATE: "/products/:id",
    DELETE: "/products/:id",
    FEATURED: "/products/featured",
    SEARCH: "/products/search",
    BY_CATEGORY: "/products/category/:categoryId",
    RELATED: "/products/:id/related",
  },

  // Category endpoints
  CATEGORIES: {
    LIST: "/categories",
    DETAIL: "/categories/:id",
    CREATE: "/categories",
    UPDATE: "/categories/:id",
    DELETE: "/categories/:id",
    TREE: "/categories/tree",
    BY_SLUG: "/categories/slug/:slug",
  },

  // Order endpoints
  ORDERS: {
    LIST: "/orders",
    DETAIL: "/orders/:id",
    CREATE: "/orders",
    UPDATE: "/orders/:id",
    DELETE: "/orders/:id",
    MY_ORDERS: "/orders/my-orders",
    UPDATE_STATUS: "/orders/:id/status",
    CANCEL: "/orders/:id/cancel",
    TRACKING: "/orders/:orderNumber/tracking",
  },

  // Cart endpoints
  CART: {
    GET: "/cart",
    ADD: "/cart/add",
    UPDATE: "/cart/update",
    REMOVE: "/cart/remove/:productId",
    CLEAR: "/cart/clear",
    APPLY_COUPON: "/cart/coupon",
    REMOVE_COUPON: "/cart/coupon",
  },

  // Wishlist endpoints
  WISHLIST: {
    GET: "/wishlist",
    ADD: "/wishlist/add",
    REMOVE: "/wishlist/remove/:productId",
    CLEAR: "/wishlist/clear",
    CHECK: "/wishlist/check/:productId",
  },

  // Banner endpoints
  BANNERS: {
    LIST: "/banners",
    DETAIL: "/banners/:id",
    CREATE: "/banners",
    UPDATE: "/banners/:id",
    DELETE: "/banners/:id",
    UPDATE_ORDER: "/banners/:id/order",
    TOGGLE_STATUS: "/banners/:id/toggle",
  },

  // Customer endpoints (Admin)
  CUSTOMERS: {
    LIST: "/customers",
    DETAIL: "/customers/:id",
    UPDATE: "/customers/:id",
    DELETE: "/customers/:id",
    STATS: "/customers/:id/stats",
    ORDERS: "/customers/:id/orders",
  },

  // Analytics endpoints
  ANALYTICS: {
    DASHBOARD: "/analytics/dashboard",
    SALES_CHART: "/analytics/sales-chart",
    TOP_PRODUCTS: "/analytics/top-products",
    TOP_CATEGORIES: "/analytics/top-categories",
    CUSTOMERS: "/analytics/customers",
    INVENTORY: "/analytics/inventory",
  },

  // Upload endpoints
  UPLOAD: {
    IMAGE: "/upload/image",
    FILE: "/upload/file",
    MULTIPLE: "/upload/multiple",
  },
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;
