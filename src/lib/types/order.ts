import { BaseEntity, Address } from "./common";
import { Product } from "./product";
import { User } from "./auth";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "failed";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded";

export type PaymentMethod =
  | "credit_card"
  | "debit_card"
  | "paypal"
  | "stripe"
  | "razorpay"
  | "bkash"
  | "nagad"
  | "cash_on_delivery";

export type ShippingMethod =
  | "standard"
  | "express"
  | "overnight"
  | "pickup"
  | "digital";

export interface OrderItem extends BaseEntity {
  orderId: string;
  productId: string;
  product?: Product;
  name: string;
  image: string;
  price: number;
  quantity: number;
  total: number;
  sku?: string;
  variant?: string;
  attributes?: Record<string, string>;
}

export interface OrderCoupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  discount: number;
  description?: string;
}

export interface OrderShipping {
  method: ShippingMethod;
  provider: string;
  cost: number;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export interface OrderPayment {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  amount: number;
  paidAt?: string;
  failureReason?: string;
  refundAmount?: number;
  refundedAt?: string;
}

export interface OrderStatusHistory extends BaseEntity {
  orderId: string;
  status: OrderStatus;
  comment?: string;
  updatedBy?: string;
  isCustomerNotified: boolean;
}

export interface Order extends BaseEntity {
  orderNumber: string;
  userId?: string;
  user?: User;

  // Customer information (for guest orders)
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };

  // Items and pricing
  items: OrderItem[];
  itemsCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;

  // Addresses
  billingAddress: Address;
  shippingAddress: Address;

  // Status and payments
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  payment: OrderPayment;
  shipping: OrderShipping;

  // Discounts
  coupon?: OrderCoupon;

  // Notes and metadata
  notes?: string;
  adminNotes?: string;

  // Tracking
  statusHistory: OrderStatusHistory[];

  // Timestamps
  confirmedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;

  // Flags
  isGuestOrder: boolean;
  isPaid: boolean;
  isShipped: boolean;
  isDelivered: boolean;
  isCancelled: boolean;
  isRefunded: boolean;
}

export interface CreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
    variantId?: string;
  }>;
  billingAddress: Omit<Address, "id">;
  shippingAddress: Omit<Address, "id">;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  couponCode?: string;
  notes?: string;
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
  comment?: string;
  notifyCustomer?: boolean;
  trackingNumber?: string;
}

export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  userId?: string;
  startDate?: string;
  endDate?: string;
  minTotal?: number;
  maxTotal?: number;
  search?: string; // Search by order number, customer name, email
  sortBy?: "createdAt" | "total" | "status" | "orderNumber";
  sortOrder?: "asc" | "desc";
}

// Order statistics
export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  conversionRate: number;
}

// Order tracking information
export interface OrderTracking {
  orderNumber: string;
  status: OrderStatus;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  history: Array<{
    status: string;
    description: string;
    timestamp: string;
    location?: string;
  }>;
}
