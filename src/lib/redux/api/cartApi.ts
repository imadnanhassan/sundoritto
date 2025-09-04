import { baseApi } from "./baseApi";
import { CartItem, Cart } from "@/lib/types/cart";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<{ data: Cart }, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<
      { data: Cart },
      { productId: string; quantity: number }
    >({
      query: (item) => ({
        url: "/cart/add",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation<
      { data: Cart },
      { productId: string; quantity: number }
    >({
      query: (item) => ({
        url: `/cart/update`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<{ data: Cart }, string>({
      query: (productId) => ({
        url: `/cart/remove/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    applyCoupon: builder.mutation<{ data: Cart }, { code: string }>({
      query: (coupon) => ({
        url: "/cart/coupon",
        method: "POST",
        body: coupon,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCoupon: builder.mutation<{ data: Cart }, void>({
      query: () => ({
        url: "/cart/coupon",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useApplyCouponMutation,
  useRemoveCouponMutation,
} = cartApi;
