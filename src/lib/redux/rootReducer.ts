import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import uiSlice from "./slices/uiSlice";
import filterSlice from "./slices/filterSlice";

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice,
  cart: cartSlice,
  ui: uiSlice,
  filter: filterSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
