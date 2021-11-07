// data.values from messari data.
import dayjs from "dayjs";

export const formatTimeDataForChart = (messariData: any[]) => {
  let chartData = [];

  chartData = messariData.map((timeData) => {
    return {
      x: dayjs(timeData[0]).format("MM/DD/YYYY HH:mm"),
      y: timeData[1],
    };
  });

  return chartData;
};

export const TIME_PARAMS = {
  "24hr": {
    start: dayjs().subtract(24, "hours").format(),
    end: dayjs().format(),
    interval: "5m",
    chartFormat: "%m/%d/%Y %H:%M",
    chartXAxis: "%H %M",
    precision: "minute",
  },
  "7d": {
    start: dayjs().subtract(7, "day").format(),
    end: dayjs().format(),
    interval: "1h",
    chartFormat: "%m/%d/%Y %H:%M",
    chartXAxis: "%b %d",
    precision: "hour",
  },
  "1M": {
    start: dayjs().subtract(1, "month").format(),
    end: dayjs().format(),
    interval: "1h",
    chartFormat: "%m/%d/%Y %H:%M",
    chartXAxis: "%b %d",
    precision: "hour",
  },
  "3M": {
    start: dayjs().subtract(3, "month").format(),
    end: dayjs().format(),
    interval: "1d",
    chartFormat: "%m/%d/%Y %H:%M",
    chartXAxis: "%b %d",
    precision: "day",
  },
};
