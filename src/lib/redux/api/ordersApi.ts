import { baseApi } from "./baseApi";
import {
  Order,
  CreateOrderRequest,
  ApiResponse,
  OrderStatus,
} from "@/lib/types/order";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<
      ApiResponse<Order[]>,
      {
        page?: number;
        limit?: number;
        status?: OrderStatus;
        userId?: string;
      }
    >({
      query: (params) => ({
        url: "/orders",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          status: params.status,
          userId: params.userId,
        },
      }),
      providesTags: ["Order"],
    }),
    getOrder: builder.query<{ data: Order }, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Order", id }],
    }),
    createOrder: builder.mutation<{ data: Order }, CreateOrderRequest>({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order", "Cart"],
    }),
    updateOrderStatus: builder.mutation<
      { data: Order },
      { id: string; status: OrderStatus }
    >({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),
    cancelOrder: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),
    getUserOrders: builder.query<
      ApiResponse<Order[]>,
      { page?: number; limit?: number }
    >({
      query: (params) => ({
        url: "/orders/my-orders",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
        },
      }),
      providesTags: ["Order"],
    }),
    getOrderTracking: builder.query<{ data: any }, string>({
      query: (orderNumber) => `/orders/${orderNumber}/tracking`,
      providesTags: (_result, _error, id) => [{ type: "Order", id }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderTrackingQuery,
} = ordersApi;
