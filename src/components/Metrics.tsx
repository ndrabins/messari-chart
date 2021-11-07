import { Typography, Stack, Box, Divider, Avatar, Chip } from "@mui/material";
import { getColorStyles } from "../utils/styles";
import { PriceChangeIcon } from "./PriceChangeIcon";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";

interface MetricsProps {}

export function Metrics(props: MetricsProps) {
  const { assetMetrics, assetName } = useAppSelector(
    (state: RootState) => state.messari
  );

  const { id } = assetMetrics;
  const { percent_change_usd_last_24_hours, price_usd } =
    assetMetrics.market_data;
  const { rank, current_marketcap_usd } = assetMetrics.marketcap;

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
            sx={{ color: "grey.400" }}
            variant="subtitle2"
            gutterBottom
            align="right"
          >
            Price Change
            <Chip
              label="24h"
              size="small"
              sx={{
                bgcolor: "grey.900",
                color: "grey.500",
                ml: 1,
              }}
            />
          </Typography>
          <Stack direction="row" justifyContent="flex-end">
            <PriceChangeIcon value={percent_change_usd_last_24_hours} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: getColorStyles(percent_change_usd_last_24_hours),
              }}
              align="right"
            >
              {percent_change_usd_last_24_hours.toFixed(2)}%
            </Typography>
          </Stack>
        </Stack>
        <Stack sx={{ flexWrap: "wrap" }}>
          <Typography
            sx={{ color: "grey.400" }}
            variant="subtitle2"
            gutterBottom
            align="right"
          >
            Price
            <Chip
              label="USD"
              size="small"
              sx={{
                bgcolor: "grey.900",
                color: "grey.500",
                ml: 1,
              }}
            />
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }} align="right">
            $ {price_usd.toFixed(2)}
          </Typography>
        </Stack>
        <Stack>
          <Typography
            sx={{ color: "grey.400" }}
            variant="subtitle2"
            gutterBottom
          >
            Market Rank
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }} align="right">
            {" "}
            #{rank}
          </Typography>
        </Stack>
        <Stack>
          <Typography
            sx={{ color: "grey.400" }}
            variant="subtitle2"
            gutterBottom
            align="right"
          >
            Total Market Cap
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }} align="right">
            $ {current_marketcap_usd.toLocaleString("en-US").split(".")[0]}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
    </Box>
  );
}
