import { baseApi } from "./baseApi";
import { Banner, ApiResponse } from "@/lib/types/banner";

export const bannersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<{ data: Banner[] }, { isActive?: boolean }>({
      query: (params) => ({
        url: "/banners",
        params,
      }),
      providesTags: ["Banner"],
    }),
    getBanner: builder.query<{ data: Banner }, string>({
      query: (id) => `/banners/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Banner", id }],
    }),
    createBanner: builder.mutation<{ data: Banner }, Partial<Banner>>({
      query: (banner) => ({
        url: "/banners",
        method: "POST",
        body: banner,
      }),
      invalidatesTags: ["Banner"],
    }),
    updateBanner: builder.mutation<
      { data: Banner },
      { id: string; banner: Partial<Banner> }
    >({
      query: ({ id, banner }) => ({
        url: `/banners/${id}`,
        method: "PUT",
        body: banner,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Banner", id },
        { type: "Banner", id: "LIST" },
      ],
    }),
    deleteBanner: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
    updateBannerOrder: builder.mutation<
      { message: string },
      { id: string; order: number }
    >({
      query: ({ id, order }) => ({
        url: `/banners/${id}/order`,
        method: "PUT",
        body: { order },
      }),
      invalidatesTags: ["Banner"],
    }),
    toggleBannerStatus: builder.mutation<{ data: Banner }, string>({
      query: (id) => ({
        url: `/banners/${id}/toggle`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Banner", id },
        { type: "Banner", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useUpdateBannerOrderMutation,
  useToggleBannerStatusMutation,
} = bannersApi;
