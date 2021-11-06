import axios from "axios";
import { formatTimeDataForChart } from "../utils/data";

const BASE_URL = "https://data.messari.io/api/v1/";

const headers = {
  // "x-messari-api-key": process.env.REACT_APP_MESSARI_API ?? "",
};

export const fetchAssetTimeSeries = async (assetName: string) => {
  const params = {
    // start:
    // end
    // interval
  };

  const response = await axios.get(
    `${BASE_URL}assets/${assetName}/metrics/price/time-series`,
    { params: params, headers: headers }
  );

  const formattedData = formatTimeDataForChart(response.data.data.values);
  return formattedData;
};

// TODO: Fetch market data for asset and display above chart
export const fetchAssetMetrics = async (assetName: string) => {
  const response = await axios.get(`${BASE_URL}assets/${assetName}/metrics`, {
    headers: headers,
  });

  const { market_data, marketcap } = response.data.data;
  return { market_data, marketcap };
};
