import { baseApi } from "./baseApi";
import { Product, ApiResponse } from "@/lib/types/product";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<{ data: Product[] }, void>({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation<{ message: string }, string>({
      query: (productId) => ({
        url: "/wishlist/add",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation<{ message: string }, string>({
      query: (productId) => ({
        url: `/wishlist/remove/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    clearWishlist: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/wishlist/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    checkInWishlist: builder.query<{ inWishlist: boolean }, string>({
      query: (productId) => `/wishlist/check/${productId}`,
      providesTags: (_result, _error, id) => [{ type: "Wishlist", id }],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
  useCheckInWishlistQuery,
} = wishlistApi;
