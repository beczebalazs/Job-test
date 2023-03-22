import { FC, ReactNode } from "react";

import { ThemeProvider } from "@mui/material";

import { theme } from "../theme";

const CustomThemeProvider: FC<{ children: ReactNode }> = (props) => {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default CustomThemeProvider;
