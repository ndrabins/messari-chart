import { ResponsiveLine } from "@nivo/line";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { CircularProgress, Stack, Card, Typography } from "@mui/material";
import { grey, blueGrey } from "@mui/material/colors";

import dayjs from "dayjs";

interface ChartProps {
  assetKey: string;
}

export function Chart(props: ChartProps) {
  const { assetKey } = props;

  const { timeSeriesData } = useAppSelector(
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
      margin={{ top: 50, right: 60, bottom: 140, left: 60 }}
      xScale={{
        type: "time",
        min: "auto",
        max: "auto",
        format: "%m/%d/%Y %H:%M",
        precision: "hour",
      }}
      xFormat="time:%d/%m/%Y %H:%M"
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        reverse: false,
        stacked: true,
      }}
      theme={{
        textColor: blueGrey[300],
      }}
      areaOpacity={0.1}
      enableGridX={false}
      colors={["rgb(97, 205, 187)", "white"]}
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
        format: "%b %d",
      }}
      axisLeft={{
        legendOffset: -40,
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
                  sx={{ minWidth: 200, mb: 2 }}
                  justifyContent="space-between"
                >
                  <Typography variant="body1">{point.serieId}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    $ {Number(point.data.yFormatted).toFixed(2)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  sx={{ minWidth: 200 }}
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle1" sx={{ color: "grey.400" }}>
                    {dayjs(point.data.xFormatted).format("DD/MM/YYYY")}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "grey.400" }}>
                    {dayjs(point.data.xFormatted).format("h:mm A")}
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
