import { baseApi } from "./baseApi";
import {
  Product,
  ProductFilters,
  ApiResponse,
  CreateProductRequest,
} from "@/lib/types/product";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<Product[]>, ProductFilters>({
      query: (filters) => ({
        url: "/products",
        params: {
          page: filters.page || 1,
          limit: filters.limit || 12,
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          search: filters.search,
          sortBy: filters.sortBy || "createdAt",
          sortOrder: filters.sortOrder || "desc",
        },
      }),
      providesTags: ["Product"],
    }),
    getProduct: builder.query<{ data: Product }, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation<{ data: Product }, CreateProductRequest>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      { data: Product },
      { id: string; product: Partial<Product> }
    >({
      query: ({ id, product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
    getFeaturedProducts: builder.query<{ data: Product[] }, void>({
      query: () => "/products/featured",
      providesTags: ["Product"],
    }),
    getProductsByCategory: builder.query<
      ApiResponse<Product[]>,
      { categoryId: string; page?: number; limit?: number }
    >({
      query: ({ categoryId, page = 1, limit = 12 }) => ({
        url: `/products/category/${categoryId}`,
        params: { page, limit },
      }),
      providesTags: ["Product"],
    }),
    searchProducts: builder.query<
      ApiResponse<Product[]>,
      { query: string; page?: number; limit?: number }
    >({
      query: ({ query, page = 1, limit = 12 }) => ({
        url: "/products/search",
        params: { q: query, page, limit },
      }),
      providesTags: ["Product"],
    }),
    getRelatedProducts: builder.query<{ data: Product[] }, string>({
      query: (productId) => `/products/${productId}/related`,
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetFeaturedProductsQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useGetRelatedProductsQuery,
} = productsApi;
