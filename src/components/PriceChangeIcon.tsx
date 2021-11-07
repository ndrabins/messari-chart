import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { Stack } from "@mui/material";
import { getColorStyles } from "../utils/styles";

interface PriceChangeIconProps {
  value: number;
}

export function PriceChangeIcon(props: PriceChangeIconProps) {
  const { value } = props;

  console.log("value", value);
  return (
    <Stack alignItems="center" justifyContent="center">
      {value > 0 ? (
        <ArrowUpward
          fontSize="small"
          sx={{ mr: "1", color: getColorStyles(value) }}
        />
      ) : (
        <ArrowDownward
          fontSize="small"
          sx={{ mr: "1", color: getColorStyles(value) }}
        />
      )}
    </Stack>
  );
}
