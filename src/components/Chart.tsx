import { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";

interface ChartProps {}

export function Chart(props: ChartProps) {
  const data = useAppSelector(
    (state: RootState) => state.messari.timeSeriesData
  );

  return (
    <Box sx={{ height: 800 }}>
      <ResponsiveLine
        data={[
          {
            id: "sol",
            data: data,
          },
        ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "linear" }}
        yScale={{
          type: "linear",
          // min: "auto",
          // max: "auto",
          min: 100, // TODO: replace
          max: 300, // TODO: replace
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Price",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "purple_blue_green" }}
        lineWidth={3}
        pointSize={10}
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
