import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRegistration, User, authState } from "@/types/types";
import axios, { AxiosError } from "axios";
import { AUTH_BASE_URL } from "../baseURL";
import { registerFormData } from "@/schema/schema";

const initialState: authState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData: registerFormData, { rejectWithValue }) => {
    try {
      const payload = {...userData, confirmation: userData.confirm};
      const res = await axios.post(`${AUTH_BASE_URL}/register`, payload , {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message || axiosError.message || "Request failed";
      return rejectWithValue(message);
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
        state.loading = true, 
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<UserRegistration>) => {
        state.loading = false;
        state.error = null;
        if (action.payload) state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false, 
        state.error = action.payload as string;

      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
