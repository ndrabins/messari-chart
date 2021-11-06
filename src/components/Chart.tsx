import { ResponsiveLine } from "@nivo/line";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";

interface ChartProps {}

export function Chart(props: ChartProps) {
  const { timeSeriesData, timeSeriesStatus } = useAppSelector(
    (state: RootState) => state.messari
  );

  if (!timeSeriesData.length) {
    return <div />;
  }

  return (
    <ResponsiveLine
      data={[
        {
          id: "sol",
          data: timeSeriesData,
        },
      ]}
      curve="linear"
      margin={{ top: 50, right: 60, bottom: 100, left: 60 }}
      xScale={{
        type: "time",
        min: "auto",
        max: "auto",
        // format: "%d-%m-%Y",
        format: "%m/%d/%Y",
        // precision: "second",
      }}
      xFormat="time:%d/%m/%Y"
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      // TODO update axis based on date
      axisBottom={{
        format: "%b %d",
        // tickValues: "every 2 days",
        // tickRotation: -90,
      }}
      axisLeft={{
        tickPadding: 5,
        tickRotation: 0,
        legend: "Price",
        legendPosition: "middle",
      }}
      colors={{ scheme: "nivo" }}
      lineWidth={2}
      pointSize={0}
      enableArea={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
}
