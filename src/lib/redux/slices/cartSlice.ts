import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/lib/types/cart";

interface CartState {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  itemCount: number;
  coupon: {
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  } | null;
  isOpen: boolean;
}

// Get initial state from localStorage
const getInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  }

  return {
    items: [],
    total: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    itemCount: 0,
    coupon: null,
    isOpen: false,
  };
};

const calculateTotals = (state: CartState) => {
  state.subtotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  state.itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate discount
  state.discount = 0;
  if (state.coupon) {
    if (state.coupon.type === "percentage") {
      state.discount = (state.subtotal * state.coupon.discount) / 100;
    } else {
      state.discount = state.coupon.discount;
    }
  }

  // Calculate tax (assuming 10% tax rate)
  state.tax = (state.subtotal - state.discount) * 0.1;

  // Calculate shipping (free shipping over $100)
  state.shipping = state.subtotal > 100 ? 0 : 10;

  // Calculate total
  state.total = state.subtotal - state.discount + state.tax + state.shipping;

  // Save to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        if (existingItem.quantity > existingItem.stock) {
          existingItem.quantity = existingItem.stock;
        }
      } else {
        state.items.push(action.payload);
      }
      calculateTotals(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      calculateTotals(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.min(action.payload.quantity, item.stock);
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== item.id);
        }
      }
      calculateTotals(state);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }
      calculateTotals(state);
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== item.id);
        }
      }
      calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      calculateTotals(state);
    },
    applyCoupon: (
      state,
      action: PayloadAction<{
        code: string;
        discount: number;
        type: "percentage" | "fixed";
      }>
    ) => {
      state.coupon = action.payload;
      calculateTotals(state);
    },
    removeCoupon: (state) => {
      state.coupon = null;
      calculateTotals(state);
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    syncWithServer: (state, action: PayloadAction<CartState>) => {
      return { ...action.payload, isOpen: state.isOpen };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  openCart,
  closeCart,
  toggleCart,
  syncWithServer,
} = cartSlice.actions;
export default cartSlice.reducer;
