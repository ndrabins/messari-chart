import { useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { RootState, getTimeSeriesData } from "../store";

interface ChartProps {}

export function Chart(props: ChartProps) {
  const { timeSeriesData, timeSeriesStatus } = useAppSelector(
    (state: RootState) => state.messari
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTimeSeriesData("sol"));
  }, []);

  if (!timeSeriesData.length) {
    return <div />;
  }

  return (
    <Box sx={{ height: 800 }}>
      <ResponsiveLine
        data={[
          {
            id: "sol",
            data: timeSeriesData,
          },
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{
          type: "time",
          min: "auto",
          max: "auto",
          format: "%d-%m-%Y",
        }}
        xFormat="time:%d-%m-%Y"
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
        colors={{ scheme: "purple_blue_green" }}
        lineWidth={2}
        pointSize={0}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
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
            itemOpacity: 0.75,
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
    </Box>
  );
}
