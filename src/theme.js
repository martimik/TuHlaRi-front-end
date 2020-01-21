import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    palette: {
        primary: {
           // main: "#e53935"
           main: "#292961"        
        },
        secondary: {
            main: "#dd2c00"
        },
        contrastThreshold: 3,
        tonalOffset: 0.2
    }
});

export default theme;
