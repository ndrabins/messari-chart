import { Stack, Box, Tab, Tabs } from "@mui/material";
import { grey } from "@mui/material/colors";

interface TimeScaleSwitcherProps {
  timeScaleValue: TimeScale;
  onChange(value: string): void;
}

export function TimeScaleSwitcher(props: TimeScaleSwitcherProps) {
  const { timeScaleValue, onChange } = props;

  const handleChange = (event: any, newValue: any) => {
    onChange(newValue);
  };

  return (
    <Stack alignItems="flex-end" justifyContent="flex-end">
      <Box>
        <Tabs
          value={timeScaleValue}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: grey[800],
              borderRadius: "16px",
              height: "32px",
              zIndex: 0,
              marginTop: "8px",
              marginBottom: "8px",
            },
          }}
        >
          <Tab
            value="24hr"
            sx={{ p: 1, zIndex: 2 }}
            label="24hr"
            disableRipple
          />
          <Tab value="7d" sx={{ p: 1, zIndex: 2 }} label="7d" disableRipple />
          <Tab value="1M" sx={{ p: 1, zIndex: 2 }} label="1M" disableRipple />
          <Tab value="3M" sx={{ p: 1, zIndex: 2 }} label="3M" disableRipple />
        </Tabs>
      </Box>
    </Stack>
  );
}
