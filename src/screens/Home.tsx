import { Box, Container, Stack, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  RootState,
  getTimeSeriesData,
  getMetricsData,
  getAssets,
} from "../store";
import { SearchInput, Chart, Metrics, TimeScaleSwitcher } from "../components";

export function Home() {
  const [timeScaleValue, setTimeScaleValue] = useState<TimeScale>("3M");
  const dispatch = useAppDispatch();
  const { assetKey } = useAppSelector((state: RootState) => state.messari);

  useEffect(() => {
    dispatch(getAssets());
  }, []);

  useEffect(() => {
    dispatch(getMetricsData(assetKey));
  }, [assetKey]);

  useEffect(() => {
    dispatch(getTimeSeriesData({ assetKey, timeScale: timeScaleValue }));
  }, [timeScaleValue, assetKey]);

  const handleTimeScaleChange = (timeScale: TimeScale) => {
    setTimeScaleValue(timeScale);
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, #004d40, #26a69a)`,
      }}
    >
      <Container>
        <Stack
          sx={{ height: "100vh" }}
          justifyContent="center"
          alignItems="center"
        >
          <SearchInput />
          <Box sx={{ height: "80%", width: "100%" }}>
            <Card sx={{ height: "100%", p: 2 }}>
              <Metrics />
              <TimeScaleSwitcher
                timeScaleValue={timeScaleValue}
                onChange={handleTimeScaleChange}
              />
              <Chart timeScale={timeScaleValue} />
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
