import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAssetMetrics, fetchAssetTimeSeries } from "./api";
import { RootState, AppThunk } from "./index";

export interface MessariState {
  timeSeriesData: any;
  assetMetrics: MessariMetrics;
  timeSeriesStatus: "idle" | "loading" | "failed";
  assetMetricsStatus: "idle" | "loading" | "failed";
}

const initialState: MessariState = {
  timeSeriesData: [],
  assetMetrics: {
    market_data: {
      percent_change_usd_last_24_hours: 0,
      price_usd: 0,
    },
    marketcap: {
      rank: 0,
      current_marketcap_usd: 0,
    },
  },
  timeSeriesStatus: "idle",
  assetMetricsStatus: "idle",
};

export const getTimeSeriesData = createAsyncThunk(
  "messari/getTimeSeriesData",
  async (assetKey: string) => {
    const data = await fetchAssetTimeSeries(assetKey);
    return data;
  }
);

export const getMetricsData = createAsyncThunk(
  "messari/getMetricsData",
  async (assetKey: string) => {
    const data = await fetchAssetMetrics(assetKey);
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
      })
      .addCase(getMetricsData.pending, (state) => {
        state.assetMetricsStatus = "loading";
      })
      .addCase(getMetricsData.rejected, (state) => {
        state.assetMetricsStatus = "failed";
      })
      .addCase(getMetricsData.fulfilled, (state, action: any) => {
        state.assetMetricsStatus = "idle";
        state.assetMetrics = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = messariSlice.actions;

export default messariSlice.reducer;
