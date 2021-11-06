import { Typography, Stack, Box, Divider, Avatar } from "@mui/material";

interface MetricsProps {
  assetKey: string;
  assetName: string;
  metrics: MessariMetrics;
}

export function Metrics(props: MetricsProps) {
  const { assetKey, metrics, assetName } = props;
  const { id } = metrics;
  const { percent_change_usd_last_24_hours, price_usd } = metrics.market_data;
  const { rank, current_marketcap_usd } = metrics.marketcap;

  return (
    <Box>
      <Stack
        sx={{ p: 2 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row">
          <Avatar
            sx={{ mr: 2 }}
            alt="assetName"
            src={`https://messari.io/asset-images/${id}/64.png?v=2`}
          />
          <Typography variant="h4"> {assetName}</Typography>
        </Stack>
        <Stack>
          <Typography>{percent_change_usd_last_24_hours.toFixed(2)}</Typography>
        </Stack>
        <Stack direction="row">
          <Typography> {price_usd.toFixed(2)} </Typography>
        </Stack>
        <Stack direction="row">
          <Typography> {rank}</Typography>
        </Stack>
        <Stack direction="row">
          <Typography>
            {current_marketcap_usd.toLocaleString("en-US").split(".")[0]}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
    </Box>
  );
}
