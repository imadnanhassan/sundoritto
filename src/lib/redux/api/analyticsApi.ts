import { baseApi } from "./baseApi";

interface AnalyticsData {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  salesChart: Array<{ date: string; sales: number; orders: number }>;
  topProducts: Array<{ id: string; name: string; sales: number }>;
  topCategories: Array<{ id: string; name: string; sales: number }>;
  recentOrders: Array<any>;
}

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<
      { data: AnalyticsData },
      {
        period?: "today" | "week" | "month" | "year";
        startDate?: string;
        endDate?: string;
      }
    >({
      query: (params) => ({
        url: "/analytics/dashboard",
        params,
      }),
      providesTags: ["Analytics"],
    }),
    getSalesChart: builder.query<
      {
        data: Array<{ date: string; sales: number; orders: number }>;
      },
      {
        period?: "week" | "month" | "year";
        startDate?: string;
        endDate?: string;
      }
    >({
      query: (params) => ({
        url: "/analytics/sales-chart",
        params,
      }),
      providesTags: ["Analytics"],
    }),
    getTopProducts: builder.query<
      {
        data: Array<{ id: string; name: string; sales: number; image: string }>;
      },
      { limit?: number; period?: string }
    >({
      query: (params) => ({
        url: "/analytics/top-products",
        params: { limit: params.limit || 10, period: params.period || "month" },
      }),
      providesTags: ["Analytics"],
    }),
    getTopCategories: builder.query<
      {
        data: Array<{ id: string; name: string; sales: number }>;
      },
      { limit?: number; period?: string }
    >({
      query: (params) => ({
        url: "/analytics/top-categories",
        params: { limit: params.limit || 10, period: params.period || "month" },
      }),
      providesTags: ["Analytics"],
    }),
    getCustomerStats: builder.query<
      {
        data: {
          newCustomers: number;
          returningCustomers: number;
          customerGrowth: number;
        };
      },
      { period?: string }
    >({
      query: (params) => ({
        url: "/analytics/customers",
        params,
      }),
      providesTags: ["Analytics"],
    }),
    getInventoryStats: builder.query<
      {
        data: {
          lowStock: number;
          outOfStock: number;
          totalProducts: number;
        };
      },
      void
    >({
      query: () => "/analytics/inventory",
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useGetAnalyticsQuery,
  useGetSalesChartQuery,
  useGetTopProductsQuery,
  useGetTopCategoriesQuery,
  useGetCustomerStatsQuery,
  useGetInventoryStatsQuery,
} = analyticsApi;
