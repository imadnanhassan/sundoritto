import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { addNotification } from "../slices/uiSlice";

export const errorMiddleware: Middleware = (store) => (next) => (action) => {
  // Handle RTK Query errors
  if (isRejectedWithValue(action)) {
    const error = action.payload;
    let message = "An error occurred";

    if (error?.data?.message) {
      message = error.data.message;
    } else if (error?.error) {
      message = error.error;
    } else if (typeof error === "string") {
      message = error;
    }

    // Don't show notifications for certain error types
    const skipNotification = [
      "auth/login/rejected",
      "auth/register/rejected",
    ].includes(action.type);

    if (!skipNotification) {
      store.dispatch(
        addNotification({
          type: "error",
          title: "Error",
          message,
        })
      );
    }

    // Log errors in development
    if (process.env.NODE_ENV === "development") {
      console.error("Redux Error:", {
        type: action.type,
        payload: action.payload,
      });
    }
  }

  return next(action);
};
