import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosCall from "../api/APIcall";
import { Post, PostResponse } from "../type/PostTypes";

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

// Explicitly define the return type for the thunk
export const fetchSavedPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchSavedPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosCall<PostResponse>({
      ENDPOINT: "posts/view-saved-posts",
      METHOD: "GET",
    });
    return response.data.data.posts ?? []; // Return empty array if posts is undefined
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch saved posts"
    );
  }
});

export const fetchLikedPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchLikedPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosCall<PostResponse>({
      ENDPOINT: "posts/view-liked-posts",
      METHOD: "GET",
    });
    return response.data.data.posts ?? []; // Return empty array if posts is undefined
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch liked posts"
    );
  }
});

export const fetchSharedPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchSharedPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosCall<PostResponse>({
      ENDPOINT: "posts/view-shared-posts",
      METHOD: "GET",
    });
    return response.data.data.posts ?? []; // Return empty array if posts is undefined
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch shared posts"
    );
  }
});

export const fetchCommentedPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchCommentedPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosCall<PostResponse>({
      ENDPOINT: "posts/view-commented-posts",
      METHOD: "GET",
    });
    return response.data.data.posts ?? []; // Return empty array if posts is undefined
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch commented posts"
    );
  }
});

export const fetchMentionedPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchMentionedPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosCall<PostResponse>({
      ENDPOINT: "posts/view-mentioned-posts",
      METHOD: "GET",
    });
    return response.data.data.posts ?? []; // Return empty array if posts is undefined
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch mentioned posts"
    );
  }
});

export const fetchAllPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchAllPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosCall<PostResponse>({
      ENDPOINT: "users/profile",
      METHOD: "GET",
    });
    return response.data.data.posts ?? []; // Return empty array if posts is undefined
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch posts"
    );
  }
});

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
        state.posts = action.payload
          ? action.payload.map((post) => ({
              ...post,
              isSaved: true,
            }))
          : [];
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
        state.posts = action.payload
          ? action.payload.map((post) => ({
              ...post,
              isLiked: true,
            }))
          : [];
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
        state.posts = action.payload
          ? action.payload.map((post) => ({
              ...post,
              isShared: true,
            }))
          : [];
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
        state.posts = action.payload
          ? action.payload.map((post) => ({
              ...post,
              isCommented: true,
            }))
          : [];
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
        state.posts = action.payload
          ? action.payload.map((post) => ({
              ...post,
              isMentioned: true,
            }))
          : [];
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
        state.posts = action.payload ?? [];
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = postSlice.actions;
export default postSlice.reducer;
