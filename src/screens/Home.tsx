import { Box, Container, Stack, Card } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { RootState, getTimeSeriesData, getMetricsData } from "../store";
import { SearchInput, Chart, Metrics } from "../components";

export function Home() {
  const [assetKey, setAssetKey] = useState("sol");
  const dispatch = useAppDispatch();
  const { timeSeriesData, assetMetrics } = useAppSelector(
    (state: RootState) => state.messari
  );

  useEffect(() => {
    dispatch(getTimeSeriesData("sol"));
    dispatch(getMetricsData("sol"));
  }, []);

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, #004d40, #006064)`,
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
              <Metrics assetKey={assetKey} metrics={assetMetrics} />
              <Chart />
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
