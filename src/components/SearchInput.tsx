import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Card,
  InputAdornment,
  Popper,
  CircularProgress,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "../store/hooks";
import { selectAsset } from "../store";
import { RootState } from "../store";
import { AssetList } from "./AssetList";
import { useDispatch } from "react-redux";

interface SearchInputProps {}

export function SearchInput(props: SearchInputProps) {
  const [searchValue, setSearchValue] = useState("");
  const [assetListOpen, setAssetListOpen] = useState(false);
  const { assets, timeSeriesStatus, assetMetricsStatus } = useAppSelector(
    (state: RootState) => state.messari
  );
  const anchorEl = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchValue) {
      setAssetListOpen(false);
    }
  }, [searchValue]);

  const handleOnChange = (value: string, target: HTMLElement) => {
    setSearchValue(value);
    if (value) {
      setAssetListOpen(true);
    }
  };

  const handleAssetSelect = (asset: Asset) => {
    setSearchValue("");
    setAssetListOpen(false);
    dispatch(selectAsset({ assetName: asset.name, assetKey: asset.symbol }));
  };

  const isLoading =
    timeSeriesStatus === "loading" || assetMetricsStatus === "loading";

  return (
    <ClickAwayListener onClickAway={() => setAssetListOpen(false)}>
      <Card
        sx={{
          mb: 5,
          p: 2,
          width: "400px",
          minWidth: "400px",
          justifySelf: "center",
          display: "flex",
        }}
        ref={anchorEl}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          onClick={() => setAssetListOpen(true)}
          label="Search"
          value={searchValue}
          onChange={(e) => handleOnChange(e.target.value, e.target)}
          variant="outlined"
          placeholder="Search for a crypto to display"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: isLoading && (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ),
          }}
        />
        <Popper
          id={"assetSearch"}
          open={assetListOpen}
          anchorEl={anchorEl.current}
          style={{ width: "400px", minWidth: "400px" }}
        >
          <AssetList
            filter={searchValue}
            assets={assets}
            onClick={handleAssetSelect}
          />
        </Popper>
      </Card>
    </ClickAwayListener>
  );
}
