import React from "react";
import ReactDOM from "react-dom";
import ProductsView from "./components/ProductsView";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ProductsView />, div);
    ReactDOM.unmountComponentAtNode(div);
});
