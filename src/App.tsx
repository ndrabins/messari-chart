import { useEffect, useState } from "react";
import { Box, Container, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme } from "./utils/theme";
import { fetchAssetTimeSeries } from "./utils/api";

import { SearchInput, Chart } from "./components";

function App() {
  const [assetData, setAssetData] = useState<any>();

  useEffect(() => {
    const data = fetchAssetTimeSeries("sol");
    setAssetData(data);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <Container>
          <Stack
            sx={{ height: "100vh" }}
            alignContent="center"
            justifyContent="center"
          >
            <SearchInput />
            <Chart data={assetData} />
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
