import { baseApi } from "./baseApi";
import { Category, ApiResponse } from "@/lib/types/product";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<{ data: Category[] }, { parent?: string }>({
      query: (params) => ({
        url: "/categories",
        params,
      }),
      providesTags: ["Category"],
    }),
    getCategory: builder.query<{ data: Category }, string>({
      query: (id) => `/categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Category", id }],
    }),
    getCategoryBySlug: builder.query<{ data: Category }, string>({
      query: (slug) => `/categories/slug/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Category", id: slug }],
    }),
    createCategory: builder.mutation<{ data: Category }, Partial<Category>>({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      { data: Category },
      { id: string; category: Partial<Category> }
    >({
      query: ({ id, category }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),
    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getParentCategories: builder.query<{ data: Category[] }, void>({
      query: () => "/categories/parents",
      providesTags: ["Category"],
    }),
    getCategoryTree: builder.query<{ data: Category[] }, void>({
      query: () => "/categories/tree",
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetCategoryBySlugQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetParentCategoriesQuery,
  useGetCategoryTreeQuery,
} = categoriesApi;
