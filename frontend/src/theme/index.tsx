import React, { FC } from "react";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
    },
  })
);

const Theme: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider>{children}</StylesProvider>
    </ThemeProvider>
  );
};

export default Theme;
