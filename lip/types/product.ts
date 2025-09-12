import { BaseEntity, SEOMetadata } from "./common";

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  level: number;
  isActive: boolean;
  sort: number;
  seo?: SEOMetadata;
  productsCount?: string;
  banner?: string;
}


export interface CategoryWiseProduct {
  category: string;
  slug: string;
  banner?: string;
  products: Product[];
}

export interface ProductVariant extends BaseEntity {
  productId: string;
  name: string;
  sku: string;
  price: number;
  salePrice?: number;
  stock: number;
  attributes: Record<string, string>;
  images: string[];
  isActive: boolean;
}

export interface ProductAttribute {
  id: string;
  name: string;
  type: "text" | "number" | "select" | "multiselect" | "boolean" | "color";
  values: string[];
  isRequired: boolean;
  isVariant: boolean; // If this attribute creates variants
}

export interface ProductReview extends BaseEntity {
  productId: string;
  userId: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  likes: number;
  dislikes: number;
  reply?: {
    comment: string;
    repliedAt: string;
    repliedBy: string;
  };
}

export interface Product extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  salePrice?: number;
  images: string[];
  thumbnail?: string;
  category: Category;
  categoryId: string;
  subcategories?: Category[];
  tags: string[];

  // Stock management
  stock: number;
  lowStockThreshold: number;
  trackStock: boolean;
  manageStock: boolean;
  stockStatus:
    | "in-stock"
    | "out-of-stock"
    | "on-backorder"
    | "out-of-stock"
    | "low-stock";

  // Product attributes
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  brand?: string;
  model?: string;
  color?: string;
  size?: string;
  material?: string;

  // Status and features
  status: "draft" | "published" | "private";
  isFeatured: boolean;
  isDigital: boolean;
  isActive: boolean;

  // Reviews and ratings
  rating: number;
  reviewsCount: number;
  reviews?: ProductReview[];

  // Variants
  hasVariants: boolean;
  variants?: ProductVariant[];
  attributes?: ProductAttribute[];

  // SEO and metadata
  seo?: SEOMetadata;

  // Sales data
  salesCount: number;
  viewsCount: number;
  wishlistCount: number;

  // Related products
  relatedProducts?: Product[];
  crossSells?: Product[];
  upSells?: Product[];
  howToUse?: string;

  qa?: {
    id: string;
    question: string;
    answer: string;
    date: string;
  }[];
}

export interface CreateProductRequest {
  name: string;
  description: string;
  shortDescription?: string;
  sku: string;
  price: number;
  salePrice?: number;
  images: string[];
  categoryId: string;
  subcategoryIds?: string[];
  tags: string[];
  stock: number;
  lowStockThreshold: number;
  trackStock: boolean;
  weight?: number;
  dimensions?: Product["dimensions"];
  brand?: string;
  isFeatured: boolean;
  isDigital: boolean;
  status: Product["status"];
  seo?: SEOMetadata;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  isFeatured?: boolean;
  brand?: string;
  brands?: string[];
  tags?: string[];
  search?: string;
  sortBy?:
    | "name"
    | "price"
    | "rating"
    | "createdAt"
    | "salesCount"
    | "viewsCount";
  sortOrder?: "asc" | "desc";
  status?: Product["status"];
}

export interface ProductSearchFilters extends ProductFilters {
  query: string;
  searchFields?: ("name" | "description" | "sku" | "tags")[] | "price";
}

// Product statistics for dashboard
export interface ProductStats {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  featuredProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalValue: number;
  averagePrice: number;
}
