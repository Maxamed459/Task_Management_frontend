import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authentication/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const preloadedUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;
const preloadedToken =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || "null"
      : null;

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      user: preloadedUser,
      token: preloadedToken,
      loading: false,
      error: null,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
