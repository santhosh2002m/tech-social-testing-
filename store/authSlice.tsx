import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosCall from "../api/APIcall";
import secureLocalStorage from "react-secure-storage";
import {
  SignUpFormData,
  SignInFormData,
  AuthResponse,
} from "../type/AuthTypes";

export const registerUser = createAsyncThunk<
  AuthResponse,
  SignUpFormData,
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosCall<AuthResponse>({
      ENDPOINT: "users/register",
      METHOD: "POST",
      PAYLOAD: userData,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to register user");
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  SignInFormData,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axiosCall<AuthResponse>({
      ENDPOINT: "users/login",
      METHOD: "POST",
      PAYLOAD: credentials,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to login");
  }
});

export const verifyOtp = createAsyncThunk<
  AuthResponse,
  { email: string; otp: string },
  { rejectValue: string }
>("auth/verifyOtp", async ({ email, otp }, { rejectWithValue }) => {
  try {
    const response = await axiosCall<AuthResponse>({
      ENDPOINT: "users/verify-otp",
      METHOD: "POST",
      PAYLOAD: { email, otp },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to verify OTP");
  }
});

export const forgotPassword = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>("auth/forgotPassword", async (email, { rejectWithValue }) => {
  try {
    const response = await axiosCall<{ message: string }>({
      ENDPOINT: "users/forgot-password",
      METHOD: "POST",
      PAYLOAD: { email },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.message || "Failed to send password reset link"
    );
  }
});

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string; email: string; id?: number } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      secureLocalStorage.removeItem("loginToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Registration failed";
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      secureLocalStorage.setItem("loginToken", action.payload.data.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed";
    });

    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      secureLocalStorage.setItem("loginToken", action.payload.data.token);
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "OTP verification failed";
    });

    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to send reset link";
    });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
