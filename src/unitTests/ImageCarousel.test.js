import React from "react";
import ReactDOM from "react-dom";
import ImageCarousel from "../components/ImageCarousel";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <ImageCarousel />
        </ThemeProvider>,
        div
    );
});
