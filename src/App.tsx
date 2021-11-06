import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme";
import { Provider } from "react-redux";
import { store } from "./store";
import { Home } from "./screens";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
