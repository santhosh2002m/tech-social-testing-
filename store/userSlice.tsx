// userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosCall from "../api/APIcall";

// Define the User type based on the API response
interface User {
  id: number;
  role: number;
  name: string | null;
  username: string;
  email: string;
  unique_id: number;
  bio: string;
  description: string | null;
  image: string | null;
  cover_image: string | null;
  is_verified: number;
  country_code: string;
  phone: string;
  website: string | null;
  industry: string | null;
  country: string | null;
  city: string | null;
  sex: string | null;
  dob: string | null;
  paypal_id: string | null;
  available_balance: number;
  available_coin: number;
  is_biometric_login: number;
  is_push_notification_allow: number;
  like_push_notification_status: number;
  comment_push_notification_status: number;
  is_chat_user_online: number;
  chat_last_time_online: string | null;
  account_created_with: number;
  location: string | null;
  latitude: string | null;
  longitude: string | null;
  height: string | null;
  color: string | null;
  religion: string | null;
  marital_status: string | null;
  smoke_id: string | null;
  drinking_habit: string | null;
  qualification: string | null;
  occupation: string | null;
  country_id: string | null;
  state_id: string | null;
  city_id: string | null;
  work_experience_month: string | null;
  work_experience_year: string | null;
  profile_category_type: number;
  profile_visibility: number;
  follower_status: number;
  following_status: number;
  is_show_online_chat_status: number;
  is_reported: number;
  picture: string | null;
  coverImageUrl: string | null;
  userStory: string | null;
  profileCategoryName: string;
  is_like: number;
  is_match: number;
  profile_views: number;
  isFollower: number;
  isFollowing: number;
  totalFollowing?: number; // Optional fields from expand
  totalFollower?: number;
  totalActivePost?: number;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Define the response type for the API call
interface UserProfileResponse {
  status: number;
  statusText: string;
  message: string;
  data: {
    user: User;
  };
}

// Thunk to fetch user profile data with expanded fields
export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/fetchUser", // Corrected action name
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosCall<UserProfileResponse>({
        ENDPOINT:
          "users/profile?expand=totalFollowing,totalFollower,totalActivePost",
        METHOD: "GET",
      });
      return response.data.data.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
