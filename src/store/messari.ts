import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAssetMetrics, fetchAssetTimeSeries, fetchAllAssets } from "./api";

export interface MessariState {
  timeSeriesData: any;
  assetKey: string;
  assetName: string;
  assetMetrics: MessariMetrics;
  timeSeriesStatus: "idle" | "loading" | "failed";
  assetMetricsStatus: "idle" | "loading" | "failed";
  assetsStatus: "idle" | "loading" | "failed";
  assets: Array<Asset>;
}

const initialState: MessariState = {
  timeSeriesData: [],
  assetKey: "SOL",
  assetName: "Solana",
  assetMetrics: {
    id: "b3d5d66c-26a2-404c-9325-91dc714a722b",
    market_data: {
      percent_change_usd_last_24_hours: 0,
      price_usd: 0,
    },
    marketcap: {
      rank: 0,
      current_marketcap_usd: 0,
    },
  },
  assets: [],
  assetsStatus: "idle",
  timeSeriesStatus: "idle",
  assetMetricsStatus: "idle",
};

export const getTimeSeriesData = createAsyncThunk(
  "messari/getTimeSeriesData",
  async ({
    assetKey,
    timeScale,
  }: {
    assetKey: string;
    timeScale: TimeScale;
  }) => {
    const data = await fetchAssetTimeSeries(assetKey, timeScale);
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

export const getAssets = createAsyncThunk("messari/getAssets", async () => {
  const data = await fetchAllAssets();
  return data;
});

export const messariSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    selectAsset: (
      state,
      action: PayloadAction<{ assetName: string; assetKey: string }>
    ) => {
      state.assetKey = action.payload.assetKey;
      state.assetName = action.payload.assetName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTimeSeriesData.pending, (state) => {
        state.timeSeriesStatus = "loading";
      })
      .addCase(getTimeSeriesData.rejected, (state) => {
        state.timeSeriesStatus = "failed";
      })
      .addCase(getTimeSeriesData.fulfilled, (state, action) => {
        state.timeSeriesStatus = "idle";
        state.timeSeriesData = action.payload.timeSeriesData;
        state.assetName = action.payload.assetName;
        state.assetKey = action.payload.assetKey;
      })
      .addCase(getMetricsData.pending, (state) => {
        state.assetMetricsStatus = "loading";
      })
      .addCase(getMetricsData.rejected, (state) => {
        state.assetMetricsStatus = "failed";
      })
      .addCase(getMetricsData.fulfilled, (state, action) => {
        state.assetMetricsStatus = "idle";
        state.assetMetrics = action.payload;
      })
      .addCase(getAssets.pending, (state) => {
        state.assetsStatus = "loading";
      })
      .addCase(getAssets.rejected, (state) => {
        state.assetsStatus = "failed";
      })
      .addCase(getAssets.fulfilled, (state, action) => {
        state.assetsStatus = "idle";
        state.assets = action.payload;
      });
  },
});

export const { selectAsset } = messariSlice.actions;

export default messariSlice.reducer;
