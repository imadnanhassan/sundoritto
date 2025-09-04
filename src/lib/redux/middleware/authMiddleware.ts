/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { clearCredentials } from "../slices/authSlice";

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Handle authentication errors
  if (isRejectedWithValue(action)) {
    const { payload } = action;
    if (
      (payload as any)?.status === 401 ||
      (payload as any)?.originalStatus === 401
    ) {
      // Token expired or invalid, logout user
      store.dispatch(clearCredentials());

      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }

  // Auto-save auth state to localStorage
  if (action.type === "auth/setCredentials") {
    const state = store.getState();
    if (typeof window !== "undefined" && state.auth) {
      localStorage.setItem("token", state.auth.token || "");
      localStorage.setItem("user", JSON.stringify(state.auth.user));
      if (state.auth.refreshToken) {
        localStorage.setItem("refreshToken", state.auth.refreshToken);
      }
    }
  }

  // Clear localStorage on logout
  if (action.type === "auth/clearCredentials") {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
    }
  }

  return result;
};
