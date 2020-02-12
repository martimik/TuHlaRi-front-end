import React from "react";
import ReactDOM from "react-dom";
import ProductCard from "../components/ProductCard";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import { HashRouter as Router } from "react-router-dom";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <Router>
                <ProductCard />
            </Router>
        </ThemeProvider>,
        div
    );
});
