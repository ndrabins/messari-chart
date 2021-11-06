import { TextField, Card } from "@mui/material";

interface SearchInputProps {}

export function SearchInput(props: SearchInputProps) {
  return (
    <Card
      sx={{
        mb: 5,
        p: 2,
        width: "50%",
        justifySelf: "center",
        display: "flex",
      }}
    >
      <TextField
        fullWidth
        id="outlined-basic"
        label="Search"
        variant="outlined"
      />
    </Card>
  );
}
