import axios from "axios";
import { formatTimeDataForChart } from "./data";

const headers = {
  "x-messari-api-key": process.env.REACT_APP_MESSARI_API ?? "",
};

export const fetchAssetTimeSeries = async (assetName: string) => {
  const params = {
    // start:
    // end
    // interval
  };

  const response = await axios.get(
    `https://data.messari.io/api/v1/assets/${assetName}/metrics/price/time-series`,
    { params: params, headers: headers }
  );

  console.log(response.data);
  const formattedData = formatTimeDataForChart(response.data.data.values);
  return formattedData;
};

// TODO: Fetch market data for asset and display above chart
export const fetchAssetMarketData = async (assetName: string) => {};
