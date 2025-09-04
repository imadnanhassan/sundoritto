import { baseApi } from "./baseApi";
import { User, ApiResponse } from "@/lib/types/auth";

export const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<
      ApiResponse<User[]>,
      {
        page?: number;
        limit?: number;
        search?: string;
        role?: string;
      }
    >({
      query: (params) => ({
        url: "/customers",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search,
          role: params.role,
        },
      }),
      providesTags: ["Customer"],
    }),
    getCustomer: builder.query<{ data: User }, string>({
      query: (id) => `/customers/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Customer", id }],
    }),
    updateCustomer: builder.mutation<
      { data: User },
      { id: string; customer: Partial<User> }
    >({
      query: ({ id, customer }) => ({
        url: `/customers/${id}`,
        method: "PUT",
        body: customer,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Customer", id },
        { type: "Customer", id: "LIST" },
      ],
    }),
    deleteCustomer: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
    getCustomerStats: builder.query<
      {
        data: {
          totalOrders: number;
          totalSpent: number;
          lastOrder: string;
          joinedDate: string;
        };
      },
      string
    >({
      query: (id) => `/customers/${id}/stats`,
      providesTags: (_result, _error, id) => [{ type: "Customer", id }],
    }),
    getCustomerOrders: builder.query<
      ApiResponse<any[]>,
      {
        customerId: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({ customerId, page = 1, limit = 10 }) => ({
        url: `/customers/${customerId}/orders`,
        params: { page, limit },
      }),
      providesTags: ["Order", "Customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetCustomerStatsQuery,
  useGetCustomerOrdersQuery,
} = customersApi;
