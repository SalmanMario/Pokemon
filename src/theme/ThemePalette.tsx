import { ThemeProvider, createTheme } from "@mui/material";
import { palette } from "./palette";

export function ThemePalette({ children }: any) {
  const theme = createTheme({
    ...palette,
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
