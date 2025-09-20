// import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { apiSlice } from "../api/apiSlice";

// export const store = configureStore({
//   reducer: {
//     // API slice
//     api: apiSlice.reducer,

//     // Regular slices
//     // auth: authSlice,
//     // cart: cartSlice,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//       },
//     }).concat(apiSlice.middleware),
//   devTools: process.env.NODE_ENV !== "production",
// });

// // Enable listener behavior for the store
// setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
