import React from "react";
import ReactDOM from "react-dom";
import Login from "../components/Login";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import { HashRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

it("renders without crashing when closed", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <SnackbarProvider preventDuplicate maxSnack={3}>
                <Router>
                    <Login />
                </Router>
            </SnackbarProvider>
        </ThemeProvider>,
        div
    );
});

it("renders without crashing when open", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <SnackbarProvider preventDuplicate maxSnack={3}>
                <Router>
                    <Login isOpen />
                </Router>
            </SnackbarProvider>
        </ThemeProvider>,
        div
    );
});
