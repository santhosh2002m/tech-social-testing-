// store/postSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosCall from "../api/APIcall";
import { PostData } from "../data/postData";

interface PostState {
  posts: PostData[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

interface PostResponse {
  status: number;
  statusText: string;
  message: string;
  data: {
    posts: PostData[];
  };
}

export const fetchSavedPosts = createAsyncThunk(
  "posts/fetchSavedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosCall<PostResponse>({
        ENDPOINT: "posts/view-saved-posts",
        METHOD: "GET",
      });
      return response.data.data.posts;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch saved posts"
      );
    }
  }
);

// Placeholder for other endpoints (assuming they exist)
export const fetchLikedPosts = createAsyncThunk(
  "posts/fetchLikedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosCall<PostResponse>({
        ENDPOINT: "posts/view-liked-posts", // Hypothetical endpoint
        METHOD: "GET",
      });
      return response.data.data.posts;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch liked posts"
      );
    }
  }
);

export const fetchSharedPosts = createAsyncThunk(
  "posts/fetchSharedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosCall<PostResponse>({
        ENDPOINT: "posts/view-shared-posts", // Hypothetical endpoint
        METHOD: "GET",
      });
      return response.data.data.posts;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch shared posts"
      );
    }
  }
);

export const fetchCommentedPosts = createAsyncThunk(
  "posts/fetchCommentedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosCall<PostResponse>({
        ENDPOINT: "posts/view-commented-posts", // Hypothetical endpoint
        METHOD: "GET",
      });
      return response.data.data.posts;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch commented posts"
      );
    }
  }
);

export const fetchMentionedPosts = createAsyncThunk(
  "posts/fetchMentionedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosCall<PostResponse>({
        ENDPOINT: "posts/view-mentioned-posts", // Hypothetical endpoint
        METHOD: "GET",
      });
      return response.data.data.posts;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch mentioned posts"
      );
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosCall<PostResponse>({
        ENDPOINT: "posts", // Assuming a general posts endpoint
        METHOD: "GET",
      });
      return response.data.data.posts;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.map((post) => ({
          ...post,
          isSaved: true,
        }));
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchLikedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.map((post) => ({
          ...post,
          isLiked: true,
        }));
      })
      .addCase(fetchLikedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSharedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSharedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.map((post) => ({
          ...post,
          isShared: true,
        }));
      })
      .addCase(fetchSharedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCommentedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.map((post) => ({
          ...post,
          isCommented: true,
        }));
      })
      .addCase(fetchCommentedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMentionedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMentionedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.map((post) => ({
          ...post,
          isMentioned: true,
        }));
      })
      .addCase(fetchMentionedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = postSlice.actions;
export default postSlice.reducer;
