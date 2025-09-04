import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  products: {
    category: string[];
    minPrice: number;
    maxPrice: number;
    rating: number;
    inStock: boolean;
    sortBy: "name" | "price" | "rating" | "createdAt";
    sortOrder: "asc" | "desc";
    search: string;
    page: number;
    limit: number;
  };
  orders: {
    status: string[];
    dateFrom: string;
    dateTo: string;
    sortBy: "createdAt" | "total" | "status";
    sortOrder: "asc" | "desc";
    search: string;
    page: number;
    limit: number;
  };
  customers: {
    role: string[];
    status: string[];
    joinedFrom: string;
    joinedTo: string;
    sortBy: "name" | "email" | "createdAt" | "totalOrders";
    sortOrder: "asc" | "desc";
    search: string;
    page: number;
    limit: number;
  };
}

const initialState: FilterState = {
  products: {
    category: [],
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
    inStock: true,
    sortBy: "createdAt",
    sortOrder: "desc",
    search: "",
    page: 1,
    limit: 12,
  },
  orders: {
    status: [],
    dateFrom: "",
    dateTo: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    search: "",
    page: 1,
    limit: 10,
  },
  customers: {
    role: [],
    status: [],
    joinedFrom: "",
    joinedTo: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    search: "",
    page: 1,
    limit: 10,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // Product filters
    setProductFilter: (
      state,
      action: PayloadAction<Partial<FilterState["products"]>>
    ) => {
      state.products = { ...state.products, ...action.payload };
    },
    setProductCategory: (state, action: PayloadAction<string[]>) => {
      state.products.category = action.payload;
    },
    setProductPriceRange: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.products.minPrice = action.payload.min;
      state.products.maxPrice = action.payload.max;
    },
    setProductSort: (
      state,
      action: PayloadAction<{
        sortBy: FilterState["products"]["sortBy"];
        sortOrder: FilterState["products"]["sortOrder"];
      }>
    ) => {
      state.products.sortBy = action.payload.sortBy;
      state.products.sortOrder = action.payload.sortOrder;
    },
    setProductSearch: (state, action: PayloadAction<string>) => {
      state.products.search = action.payload;
      state.products.page = 1; // Reset to first page when searching
    },
    setProductPage: (state, action: PayloadAction<number>) => {
      state.products.page = action.payload;
    },
    resetProductFilters: (state) => {
      state.products = initialState.products;
    },

    // Order filters
    setOrderFilter: (
      state,
      action: PayloadAction<Partial<FilterState["orders"]>>
    ) => {
      state.orders = { ...state.orders, ...action.payload };
    },
    setOrderStatus: (state, action: PayloadAction<string[]>) => {
      state.orders.status = action.payload;
    },
    setOrderDateRange: (
      state,
      action: PayloadAction<{ from: string; to: string }>
    ) => {
      state.orders.dateFrom = action.payload.from;
      state.orders.dateTo = action.payload.to;
    },
    setOrderSort: (
      state,
      action: PayloadAction<{
        sortBy: FilterState["orders"]["sortBy"];
        sortOrder: FilterState["orders"]["sortOrder"];
      }>
    ) => {
      state.orders.sortBy = action.payload.sortBy;
      state.orders.sortOrder = action.payload.sortOrder;
    },
    setOrderSearch: (state, action: PayloadAction<string>) => {
      state.orders.search = action.payload;
      state.orders.page = 1;
    },
    setOrderPage: (state, action: PayloadAction<number>) => {
      state.orders.page = action.payload;
    },
    resetOrderFilters: (state) => {
      state.orders = initialState.orders;
    },

    // Customer filters
    setCustomerFilter: (
      state,
      action: PayloadAction<Partial<FilterState["customers"]>>
    ) => {
      state.customers = { ...state.customers, ...action.payload };
    },
    setCustomerRole: (state, action: PayloadAction<string[]>) => {
      state.customers.role = action.payload;
    },
    setCustomerSort: (
      state,
      action: PayloadAction<{
        sortBy: FilterState["customers"]["sortBy"];
        sortOrder: FilterState["customers"]["sortOrder"];
      }>
    ) => {
      state.customers.sortBy = action.payload.sortBy;
      state.customers.sortOrder = action.payload.sortOrder;
    },
    setCustomerSearch: (state, action: PayloadAction<string>) => {
      state.customers.search = action.payload;
      state.customers.page = 1;
    },
    setCustomerPage: (state, action: PayloadAction<number>) => {
      state.customers.page = action.payload;
    },
    resetCustomerFilters: (state) => {
      state.customers = initialState.customers;
    },

    // Global reset
    resetAllFilters: () => initialState,
  },
});

export const {
  // Product filters
  setProductFilter,
  setProductCategory,
  setProductPriceRange,
  setProductSort,
  setProductSearch,
  setProductPage,
  resetProductFilters,

  // Order filters
  setOrderFilter,
  setOrderStatus,
  setOrderDateRange,
  setOrderSort,
  setOrderSearch,
  setOrderPage,
  resetOrderFilters,

  // Customer filters
  setCustomerFilter,
  setCustomerRole,
  setCustomerSort,
  setCustomerSearch,
  setCustomerPage,
  resetCustomerFilters,

  // Global
  resetAllFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
