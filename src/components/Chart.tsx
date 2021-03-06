import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { CircularProgress, Stack, Card, Typography } from "@mui/material";
import { grey, blueGrey } from "@mui/material/colors";
import { TIME_PARAMS } from "../utils/data";
import { PriceChangeIcon } from "./PriceChangeIcon";
import { getColorStyles } from "../utils/styles";

import dayjs from "dayjs";

interface ChartProps {
  timeScale: TimeScale;
}

function ChartTest(props: ChartProps) {
  const { timeScale } = props;

  const { timeSeriesData, assetKey } = useAppSelector(
    (state: RootState) => state.messari
  );

  if (!timeSeriesData.length) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <ResponsiveLine
      data={[
        {
          id: assetKey,
          data: timeSeriesData,
        },
      ]}
      curve="linear"
      margin={{ top: 20, right: 60, bottom: 180, left: 60 }}
      xScale={{
        type: "time",
        min: "auto",
        max: "auto",
        format: `${TIME_PARAMS[timeScale].chartFormat}`,
        precision: `${TIME_PARAMS[timeScale].precision}` as
          | "minute"
          | "hour"
          | "day",
      }}
      xFormat={`time:${TIME_PARAMS[timeScale].chartFormat}`}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        reverse: false,
        stacked: true,
      }}
      theme={{
        textColor: blueGrey[300],
        crosshair: {
          line: {
            stroke: grey[500],
          },
        },
      }}
      areaOpacity={0.1}
      enableGridX={false}
      colors={["rgb(97, 205, 187)"]}
      axisTop={null}
      axisRight={null}
      animate={true}
      enableArea={true}
      areaBaselineValue={timeSeriesData[0].y}
      markers={[
        {
          axis: "y",
          value: timeSeriesData[0].y,
          lineStyle: {
            stroke: "#b0bec5",
            strokeWidth: 1,
            strokeDashoffset: 10,
            strokeDasharray: 5,
          },
        },
      ]}
      axisBottom={{
        format: `${TIME_PARAMS[timeScale].chartXAxis}`,
      }}
      axisLeft={{
        legendOffset: -50,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Price",
        legendPosition: "middle",
      }}
      lineWidth={2}
      pointSize={0}
      useMesh={true}
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        // percent change since time scale
        const priceAtSlice = Number(slice.points[0].data.yFormatted);
        const priceAtTimeScale = timeSeriesData[0].y;
        const differenceValue = priceAtSlice - priceAtTimeScale;
        const percentChange = (differenceValue / priceAtTimeScale) * 100;

        return (
          <Card sx={{ p: 2, bgcolor: grey[900] }}>
            {slice.points.map((point) => (
              <Stack
                key={point.id}
                sx={{
                  color: point.serieColor,
                }}
              >
                <Stack
                  direction="row"
                  sx={{ minWidth: 200 }}
                  justifyContent="space-between"
                >
                  <Typography variant="body1">{point.serieId}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    $ {priceAtSlice.toFixed(2)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="flex-end">
                  <PriceChangeIcon value={Number(percentChange)} />
                  <Typography
                    sx={{
                      color: getColorStyles(Number(percentChange)),
                    }}
                    variant="subtitle1"
                  >
                    {Number(percentChange).toFixed(2)}
                    {"%"}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  sx={{ minWidth: 240 }}
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle1" sx={{ color: "grey.400" }}>
                    {dayjs(point.data.x).format("MMMM D, YYYY")}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "grey.400" }}>
                    {dayjs(point.data.x).format("h:mm A")}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Card>
        );
      }}
    />
  );
}

export const Chart = React.memo(ChartTest);
