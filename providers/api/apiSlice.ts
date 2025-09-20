// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store/store";


// // Base query with auth token
// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
// //   prepareHeaders: (headers, { getState }) => {
// //     const token = (getState() as RootState).auth.token;

// //     if (token) {
// //       headers.set("authorization", `Bearer ${token}`);
// //     }

// //     headers.set("Content-Type", "application/json");
// //     return headers;
// //   },
// });

// // Base query with re-authentication
// // const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
// //   let result = await baseQuery(args, api, extraOptions);

// //   if (result.error && result.error.status === 401) {
// //     // Try to refresh token
// //     console.log("Token expired, logging out...");
// //     api.dispatch({ type: "auth/logout" });
// //   }

// //   return result;
// // };

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ["User", "Product", "Category", "Order"],
//   endpoints: (builder) => ({}),
// });
