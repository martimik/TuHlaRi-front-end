import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1565c0"
        },
        secondary: {
            main: "#5e35b1"
        },
        contrastThreshold: 3,
        tonalOffset: 0.2
    }
});

export default theme;
