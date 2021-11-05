import { Box, Container, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { SearchInput, Chart } from "../components";

export function Home() {
  const theme = useTheme();

  console.log("theme", theme);
  return (
    <Box
      sx={{
        background: `linear-gradient( #263238, #212121)`,
      }}
    >
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
  );
}
