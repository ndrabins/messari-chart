import { getColorStyles } from "../utils/styles";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";

interface PriceChangeIconProps {
  value: number;
}

export function PriceChangeIcon(props: PriceChangeIconProps) {
  const { value } = props;

  console.log("value", value);
  return (
    <>
      {value > 0 ? (
        <ArrowUpward fontSize="small" sx={{ mr: "1" }} />
      ) : (
        <ArrowDownward fontSize="small" sx={{ mr: "1" }} />
      )}
    </>
  );
}
