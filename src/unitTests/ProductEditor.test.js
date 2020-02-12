import React from "react";
import ReactDOM from "react-dom";
import ProductEditor from "../components/ProductEditor";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import { SnackbarProvider } from "notistack";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <SnackbarProvider preventDuplicate maxSnack={3}>
                <ProductEditor />
            </SnackbarProvider>
        </ThemeProvider>,
        div
    );
});
