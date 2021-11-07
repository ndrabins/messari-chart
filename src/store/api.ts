import axios from "axios";
import { formatTimeDataForChart, TIME_PARAMS } from "../utils/data";
import dayjs from "dayjs";

const BASE_URL = "https://data.messari.io/api/v1/";
const BASE_URL_V2 = "https://data.messari.io/api/v2/";

const headers = {
  "x-messari-api-key": process.env.REACT_APP_MESSARI_API || "",
};

export const fetchAssetTimeSeries = async (
  assetName: string,
  timeScale: TimeScale
) => {
  console.log("time interval", timeScale);
  const params = {
    start: TIME_PARAMS[timeScale].start,
    end: dayjs().format(),
    interval: TIME_PARAMS[timeScale].interval,
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

export const fetchAssetMetrics = async (assetName: string) => {
  const response = await axios.get(`${BASE_URL}assets/${assetName}/metrics`, {
    headers: headers,
  });

  const { market_data, marketcap, id } = response.data.data;
  return { market_data, marketcap, id: id };
};

export const fetchAllAssets = async () => {
  const response = await axios.get(`${BASE_URL_V2}assets`, {
    headers: headers,
  });

  return response.data.data;
};
