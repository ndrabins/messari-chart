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
  const data = response.data.data;

  const formattedData = formatTimeDataForChart(data.values);
  return {
    timeSeriesData: formattedData,
    assetName: data.name,
    assetKey: data.symbol,
  };
};

// TODO: Fetch market data for asset and display above chart
export const fetchAssetMetrics = async (assetName: string) => {
  const response = await axios.get(`${BASE_URL}assets/${assetName}/metrics`, {
    headers: headers,
  });

  const { market_data, marketcap, id } = response.data.data;
  return { market_data, marketcap, id: id };
};
