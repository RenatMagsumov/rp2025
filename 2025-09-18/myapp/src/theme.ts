import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#ff13a4ff" },
        secondary: { main: "#030686ff" },
    },
    components: {
        MuiButton: { defaultProps: { disableElevation: true } },
    },
});
