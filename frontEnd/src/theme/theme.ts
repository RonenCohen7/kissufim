import { createTheme } from "@mui/material/styles";

export const theme = createTheme({

    direction: "rtl",

    palette: {

        primary: {
            main: "#BF7D83",
            dark: "#a96c72b9",
            light: "#e8d1d2a9",
            contrastText: "#FFFFFF"

        },

        secondary: {
            main: "#D8C6AE"
        },

        background: {
            default: "#FAF7F2",
            paper: "#FFFFFF"
        },

        text: {
            primary: "#292524",
            secondary: "#756C68"
        }
    },

    typography: {
        fontFamily: "Arial, sans-serif",

        button: {
            textTransform: "none",
            fontWeight: 400,
            letterSpacing: "0.06em"
        }
    },

    shape: {
        borderRadius: 0
    },

    components: {

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "none",
                    padding: "12px 30px",

                    "&:hover": {
                        boxShadow: "none"
                    }
                }
            }
        },

        MuiTextField: {
            defaultProps: {
                variant: "outlined"
            }
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 0
                }
            }
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    boxShadow: "none"
                }
            }
        },

        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "#25211F"
                }
            }
        }
    }
});