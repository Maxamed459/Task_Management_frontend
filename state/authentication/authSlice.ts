import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRegistration, User, authState } from "@/types/types";
import axios, { AxiosError } from "axios";
import { AUTH_BASE_URL } from "../baseURL";
import { loginFormData, registerFormData } from "@/schema/schema";
import { Navigation2Off } from "lucide";



const initialState: authState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;

export const register = createAsyncThunk(
  "auth/register",
  async (userData: registerFormData, { rejectWithValue }) => {
    try {
      const payload = { ...userData, confirmation: userData.confirm };
      const res = await axios.post(`${AUTH_BASE_URL}/register`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      // Handle field-specific errors (e.g., {"username":["A user with that username already exists."]})
      if (axiosError.response?.data) {
        const errorData = axiosError.response.data;
        // If it's an object with field errors, return the full object
        if (typeof errorData === 'object' && !errorData.message) {
          return rejectWithValue(errorData);
        }
        // If it has a message field, return that
        if (errorData.message) {
          return rejectWithValue(errorData.message);
        }
        // Otherwise return the whole data object
        return rejectWithValue(errorData);
      }
      // Fallback to axios error message
      return rejectWithValue(axiosError.message || "Request failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: loginFormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${AUTH_BASE_URL}/login`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      // Handle field-specific errors (e.g., {"username":["A user with that username already exists."]})
      if (axiosError.response?.data) {
        const errorData = axiosError.response.data;
        // If it's an object with field errors, return the full object
        if (typeof errorData === 'object' && !errorData.message) {
          return rejectWithValue(errorData);
        }
        // If it has a message field, return that
        if (errorData.message) {
          return rejectWithValue(errorData.message);
        }
        // Otherwise return the whole data object
        return rejectWithValue(errorData);
      }
      // Fallback to axios error message
      return rejectWithValue(axiosError.message || "Request failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<UserRegistration>) => {
          state.loading = false;
          state.error = null;
          if (action.payload) state.user = action.payload.user;
          if (action.payload) state.token = action.payload.token;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("token", JSON.parse(action.payload.token));
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload ?? null) as string | Record<string, string[]> | null;
      })
      .addCase(login.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserRegistration>) => {
          state.loading = false;
          state.error = null;
          if (action.payload) state.user = action.payload.user;
          if (action.payload) state.token = action.payload.token;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("token", (action.payload.token));
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload ?? null) as string | Record<string, string[]> | null;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
