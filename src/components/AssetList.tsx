import { useEffect, useState } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  ListItemSecondaryAction,
  Stack,
  Divider,
  ListItemButton,
} from "@mui/material";
import { getColorStyles } from "../utils/styles";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";

interface AssetListProps {
  assets: Array<Asset>;
  filter?: string;
  onClick(asset: Asset): void;
}

export function AssetList(props: AssetListProps) {
  const { assets, filter = "", onClick = () => {} } = props;
  const [filteredAssets, setFilteredAsset] = useState<Array<Asset>>(assets);

  const filterAssets = () => {
    const newFilteredAssets = assets.filter((asset) =>
      asset.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );

    setFilteredAsset(newFilteredAssets);
  };

  useEffect(() => {
    filterAssets();
  }, [filter]);

  return (
    <Card sx={{ minWidth: 400, maxHeight: 400, overflow: "auto" }}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {filteredAssets.map((asset) => {
          return (
            <>
              <ListItem
                key={asset.id}
                alignItems="flex-start"
                onClick={() => onClick(asset)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={`https://messari.io/asset-images/${asset.id}/64.png?v=2`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={asset.name}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text"
                        >
                          {asset.symbol}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Stack>
                      <Typography
                        sx={{ fontWeight: "bold", alignSelf: "flex-end" }}
                      >
                        $ {asset.metrics.market_data.price_usd.toFixed(2)}
                      </Typography>
                      <Typography
                        sx={{
                          alignSelf: "flex-end",
                          color: getColorStyles(
                            asset.metrics.market_data
                              .percent_change_usd_last_24_hours
                          ),
                          alignItems: "center",
                          display: "flex",
                        }}
                        variant="subtitle1"
                      >
                        {asset.metrics.market_data
                          .percent_change_usd_last_24_hours > 0 ? (
                          <ArrowUpward fontSize="small" sx={{ mr: 1 }} />
                        ) : (
                          <ArrowDownward fontSize="small" sx={{ mr: 1 }} />
                        )}
                        {asset.metrics.market_data.percent_change_usd_last_24_hours.toFixed(
                          2
                        )}
                      </Typography>
                    </Stack>
                  </ListItemSecondaryAction>
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </Card>
  );
}
