import { axiosInstance } from "@/utils/axiosInstance.util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLeads = createAsyncThunk("leads/fetchAll", async () => {
  const res = await axiosInstance.get(`/api/v1/leads/get-leads`);
  return res.data;
});

export const createLead = createAsyncThunk("leads/create", async (data) => {
  const res = await axiosInstance.post(`/api/v1/leads/create-lead`, data);
  return res.data;
});

export const deleteLead = createAsyncThunk("leads/delete", async (id) => {
  await axiosInstance.delete(`/api/v1/leads/delete-lead/${id}`);
  return id;
});

export const updateLead = createAsyncThunk(
  "leads/update",
  async ({ id, data }) => {
    const res = await axiosInstance.put(
      `/api/v1/leads/update-lead/${id}`,
      data
    );
    return res.data?.lead;
  }
);

const leadSlice = createSlice({
  name: "leads",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.leads;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.items.push(action.payload?.lead);
      })
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.items = state.items.filter((lead) => lead._id !== action.payload);
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (lead) => lead._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default leadSlice.reducer;
