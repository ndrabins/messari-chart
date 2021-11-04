import React from "react";
import { Box, Container, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme } from "./utilities/theme";

import { SearchInput, Chart } from "./components";

function App() {
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
            <Chart />
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
