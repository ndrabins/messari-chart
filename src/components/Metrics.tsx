import { Typography, Stack } from "@mui/material";

interface MetricsProps {
  assetKey: string;
  metrics: MessariMetrics;
}

export function Metrics(props: MetricsProps) {
  const { assetKey, metrics } = props;
  const { percent_change_usd_last_24_hours, price_usd } = metrics.market_data;
  const { rank, current_marketcap_usd } = metrics.marketcap;

  return (
    <Stack sx={{ mb: 2, p: 2 }} direction="row" justifyContent="space-between">
      <Typography> {percent_change_usd_last_24_hours.toFixed(2)}</Typography>
      <Typography> {price_usd.toFixed(2)} </Typography>
      <Typography> {rank}</Typography>
      <Typography>
        {current_marketcap_usd.toLocaleString("en-US").split(".")[0]}
      </Typography>
    </Stack>
  );
}
