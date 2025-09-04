import { BaseEntity, SEOMetadata } from "./common";

export type BannerType =
  | "hero"
  | "promotional"
  | "category"
  | "product"
  | "announcement";
export type BannerPosition =
  | "header"
  | "hero"
  | "sidebar"
  | "footer"
  | "popup"
  | "inline";
export type BannerDisplayType = "image" | "video" | "html" | "carousel";

export interface BannerAction {
  type: "link" | "product" | "category" | "page" | "popup" | "download";
  value: string;
  label: string;
  openInNewTab?: boolean;
}

export interface BannerSchedule {
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timezone?: string;
}

export interface BannerTargeting {
  countries?: string[];
  cities?: string[];
  userRoles?: string[];
  minAge?: number;
  maxAge?: number;
  gender?: "male" | "female" | "all";
  newCustomers?: boolean;
  returningCustomers?: boolean;
}

export interface BannerStats {
  impressions: number;
  clicks: number;
  clickThroughRate: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  lastShown?: string;
}

export interface Banner extends BaseEntity {
  title: string;
  description?: string;
  type: BannerType;
  displayType: BannerDisplayType;
  position: BannerPosition;

  // Content
  imageUrl?: string;
  mobileImageUrl?: string;
  videoUrl?: string;
  htmlContent?: string;
  altText?: string;

  // Actions
  actions: BannerAction[];

  // Display settings
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  overlay?: {
    enabled: boolean;
    color: string;
    opacity: number;
  };

  // Behavior
  autoSlide?: boolean;
  slideInterval?: number; // in seconds
  showIndicators?: boolean;
  showControls?: boolean;
  pauseOnHover?: boolean;

  // Scheduling
  schedule?: BannerSchedule;

  // Targeting
  targeting?: BannerTargeting;

  // Status and ordering
  isActive: boolean;
  sort: number;
  priority: number;

  // Analytics
  stats?: BannerStats;
  trackClicks: boolean;
  trackImpressions: boolean;

  // SEO
  seo?: SEOMetadata;
}

export interface CreateBannerRequest {
  title: string;
  description?: string;
  type: BannerType;
  displayType: BannerDisplayType;
  position: BannerPosition;
  imageUrl?: string;
  mobileImageUrl?: string;
  videoUrl?: string;
  htmlContent?: string;
  altText?: string;
  actions: BannerAction[];
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  overlay?: Banner["overlay"];
  autoSlide?: boolean;
  slideInterval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  schedule?: BannerSchedule;
  targeting?: BannerTargeting;
  isActive: boolean;
  sort: number;
  priority: number;
  trackClicks: boolean;
  trackImpressions: boolean;
  seo?: SEOMetadata;
}

export interface BannerFilters {
  page?: number;
  limit?: number;
  type?: BannerType;
  position?: BannerPosition;
  displayType?: BannerDisplayType;
  isActive?: boolean;
  search?: string;
  sortBy?:
    | "title"
    | "createdAt"
    | "sort"
    | "priority"
    | "impressions"
    | "clicks";
  sortOrder?: "asc" | "desc";
}

// Carousel specific types
export interface CarouselBanner {
  id: string;
  banners: Banner[];
  autoSlide: boolean;
  slideInterval: number;
  showIndicators: boolean;
  showControls: boolean;
  pauseOnHover: boolean;
  infinite: boolean;
}

export interface BannerClick {
  bannerId: string;
  userId?: string;
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  action: BannerAction;
}

export interface BannerImpression {
  bannerId: string;
  userId?: string;
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  duration: number; // in seconds
}
