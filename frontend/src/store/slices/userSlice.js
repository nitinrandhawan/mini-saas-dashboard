import { axiosInstance } from "@/utils/axiosInstance.util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/v1/users/login", payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

export const verifyAuth = createAsyncThunk(
  "user/verifyAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/v1/users/verify-auth");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Verification failed"
      );
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyAuth.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user;
      })
      .addCase(verifyAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
