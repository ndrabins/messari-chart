import { ResponsiveLine } from "@nivo/line";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";
import { Card, CircularProgress, Stack } from "@mui/material";

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
      margin={{ top: 50, right: 60, bottom: 100, left: 60 }}
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
        tickPadding: 5,
        tickRotation: 0,
        legend: "Price",
        legendPosition: "middle",
      }}
      lineWidth={2}
      pointSize={0}
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
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        return (
          <Card sx={{ p: 2, bgcolor: "grey.900" }}>
            {slice.points.map((point) => (
              <div
                key={point.id}
                style={{
                  color: point.serieColor,
                  padding: "3px 0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <strong>{point.serieId}</strong>
                <span>{Number(point.data.yFormatted).toFixed(2)}</span>
                <span>{point.data.xFormatted}</span>
              </div>
            ))}
          </Card>
        );
      }}
    />
  );
}
