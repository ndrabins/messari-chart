import { Typography, Stack, Box, Divider, Avatar, Chip } from "@mui/material";
import { getColorStyles } from "../utils/styles";
import { PriceChangeIcon } from "./PriceChangeIcon";

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
          <Typography
            sx={{ color: "grey.300" }}
            variant="subtitle2"
            gutterBottom
          >
            Price Change
            <Chip
              label="24h"
              size="small"
              sx={{
                bgcolor: "grey.700",
                color: "grey.200",
                ml: 1,
              }}
            />
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: getColorStyles(percent_change_usd_last_24_hours),
            }}
          >
            <PriceChangeIcon value={percent_change_usd_last_24_hours} />
            {percent_change_usd_last_24_hours.toFixed(2)}%
          </Typography>
        </Stack>
        <Stack sx={{ flexWrap: "wrap" }}>
          <Typography
            sx={{ color: "grey.300" }}
            variant="subtitle2"
            gutterBottom
          >
            Price
            <Chip
              label="USD"
              size="small"
              sx={{
                bgcolor: "grey.700",
                color: "grey.200",
                ml: 1,
              }}
            />
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            $ {price_usd.toFixed(2)}
          </Typography>
        </Stack>
        <Stack>
          <Typography
            sx={{ color: "grey.300" }}
            variant="subtitle2"
            gutterBottom
          >
            Market Rank
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {" "}
            #{rank}
          </Typography>
        </Stack>
        <Stack>
          <Typography
            sx={{ color: "grey.300" }}
            variant="subtitle2"
            gutterBottom
          >
            Total Market Cap
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {current_marketcap_usd.toLocaleString("en-US").split(".")[0]}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
    </Box>
  );
}
