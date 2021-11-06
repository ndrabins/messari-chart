// data.values from messari data.
import dayjs from "dayjs";

export const formatTimeDataForChart = (messariData: any[]) => {
  let chartData = [];

  chartData = messariData.map((timeData) => {
    return {
      x: dayjs(timeData[0]).format("MM/DD/YYYY"),
      y: timeData[1],
    };
  });

  return chartData;
};
