import { TextField, Card } from "@mui/material";

interface SearchInputProps {}

export function SearchInput(props: SearchInputProps) {
  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Search"
        variant="outlined"
      />
    </Card>
  );
}
