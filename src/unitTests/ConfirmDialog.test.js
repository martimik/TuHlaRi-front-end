import React from "react";
import ReactDOM from "react-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";

it("renders without crashing when open", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <ConfirmDialog isOpen />
        </ThemeProvider>,
        div
    );
});

it("renders without crashing when closed", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <ConfirmDialog />
        </ThemeProvider>,
        div
    );
});
