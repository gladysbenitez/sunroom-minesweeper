import React from "react";
import { ThemeProvider } from "styled-components";

  const theme = {
  colors: {
    primaryBlue:'#193340',
    badgeYellow: "#ffcd00",
    lightGrey: "#f1f1f1;",
    darkGrey: "#7b8488",
    extra: "#5553df",
  },
  fonts: ["Whitney,sans-serif"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  },
  breakpoint: {
    mobile: '375px',
    tablet: '600px',
    laptop: '1200px',
    desktop: '1600px',
  }
};


export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
