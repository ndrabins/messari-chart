// data.values from messari data.
export const formatTimeDataForChart = (messariData: any[]) => {
  let chartData = [];

  console.log("messari data", messariData);
  chartData = messariData.map((timeData) => {
    return { x: new Date(timeData[0]), y: timeData[1] };
  });

  console.log("chart data", chartData);
};
