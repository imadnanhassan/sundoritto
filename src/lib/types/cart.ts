import { BaseEntity } from './common';
import { Product } from './product';

export interface CartItem extends BaseEntity {
  cartId?: string;
  productId: string;
  product?: Product;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  quantity: number;
  stock: number;
  maxQuantity?: number;
  sku?: string;
  variant?: {
    id: string;
    name: string;
    attributes: Record<string, string>;
  };
  attributes?: Record<string, string>;
  weight?: number;
  isDigital: boolean;
  note?: string;
  
  // Calculated fields
  itemTotal: number;
  discountAmount?: number;
}

export interface CartCoupon {
  id: string;
  code: string;
  title: string;
  description?: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minimumAmount?: number;
  maximumDiscount?: number;
  discount: number;
  isValid: boolean;
  errorMessage?: string;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  itemsCount: number;
  weight: number;
}

export interface Cart extends BaseEntity {
  userId?: string;
  sessionId: string;
  items: CartItem[];
  totals: CartTotals;
  coupon?: CartCoupon;
  
  // Shipping information
  shippingAddress?: {
    country: string;
    state: string;
    city: string;
    zipCode: string;
  };
  
  // Status
  status: 'active' | 'converted' | 'abandoned';
  lastActivityAt: string;
  expiresAt?: string;
  
  // Metadata
  source?: 'web' | 'mobile' | 'api';
  userAgent?: string;
  ipAddress?: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
  variantId?: string;
  attributes?: Record<string, string>;
  note?: string;
}

export interface UpdateCartItemRequest {
  productId: string;
  quantity: number;
  note?: string;
}

export interface ApplyCouponRequest {
  code: string;
}

// Local cart state (for Redux)
export interface LocalCartState {
  items: CartItem[];
  totals: CartTotals;
  coupon?: CartCoupon;
  isOpen: boolean;
  isLoading: boolean;
  lastSyncedAt?: string;
}

// Cart summary for checkout
export interface CartSummary {
  items: Array<{
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  itemsCount: number;
  couponCode?: string;
}

// Abandoned cart recovery
export interface AbandonedCart extends Cart {
  recoveryAttempts: number;
  lastReminderSent?: string;
  isRecovered: boolean;
  recoveredAt?: string;
  customerEmail?: string;
  customerPhone?: string;
}

// Cart analytics
export interface CartAnalytics {
  totalCarts: number;
  activeCarts: number;
  convertedCarts: number;
  abandonedCarts: number;
  conversionRate: number;
  averageCartValue: number;
  topProducts: Array<{
    productId: string;
    name: string;
    image: string;
    totalAdded: number;
    totalPurchased: number;
  }>;
}