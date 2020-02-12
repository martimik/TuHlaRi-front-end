import React from "react";
import ReactDOM from "react-dom";
import Product from "../components/Product";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import { SnackbarProvider } from "notistack";
import { HashRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <SnackbarProvider preventDuplicate maxSnack={3}>
                <Router>
                    <Product />
                </Router>
            </SnackbarProvider>
        </ThemeProvider>,
        div
    );
});
