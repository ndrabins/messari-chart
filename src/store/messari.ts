import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAssetMarketData, fetchAssetTimeSeries } from "./api";
import { RootState, AppThunk } from "./index";

export interface MessariState {
  timeSeriesData: any;
  marketData: any;
  timeSeriesStatus: "idle" | "loading" | "failed";
}

const initialState: MessariState = {
  timeSeriesData: [],
  marketData: [],
  timeSeriesStatus: "idle",
};

export const getTimeSeriesData = createAsyncThunk(
  "messari/getTimeSeriesData",
  async (assetKey: string) => {
    const data = await fetchAssetTimeSeries(assetKey);
    return data;
  }
);

export const messariSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTimeSeriesData.pending, (state) => {
        state.timeSeriesStatus = "loading";
      })
      .addCase(getTimeSeriesData.rejected, (state) => {
        state.timeSeriesStatus = "failed";
      })
      .addCase(getTimeSeriesData.fulfilled, (state, action: any) => {
        state.timeSeriesStatus = "idle";
        state.timeSeriesData = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = messariSlice.actions;

export default messariSlice.reducer;
