import { Box, Container, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme";
import { Provider } from "react-redux";
import { store } from "./store";
import { Home } from "./screens";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
