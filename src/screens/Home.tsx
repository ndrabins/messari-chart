import { Box, Container, Stack, Card } from "@mui/material";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  RootState,
  getTimeSeriesData,
  getMetricsData,
  getAssets,
} from "../store";
import { SearchInput, Chart, Metrics, TimeScaleSwitcher } from "../components";

export function Home() {
  const dispatch = useAppDispatch();
  const { assetMetrics, assetName, assetKey } = useAppSelector(
    (state: RootState) => state.messari
  );

  useEffect(() => {
    dispatch(getTimeSeriesData(assetKey));
    dispatch(getMetricsData(assetKey));
    dispatch(getAssets());
  }, [assetKey]);

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
              <Metrics
                assetKey={assetKey}
                metrics={assetMetrics}
                assetName={assetName}
              />
              <TimeScaleSwitcher />
              <Chart assetKey={assetKey} />
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
