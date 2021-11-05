import { Box, Container, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme";
import { Provider } from "react-redux";
import { store } from "./store";

import { SearchInput, Chart } from "./components";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
