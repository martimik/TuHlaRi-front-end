import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./Nav";
import Products from "./Products";
import CreateProduct from "./CreateProduct";

function App() {
    const links = [
        { name: "Home", url: "/" },
        { name: "Products", url: "products" },
        { name: "Create product", url: "create-product" }
    ];

    return (
        <div className="App">
            <Router>
                <Nav links={links} />
                <div>
                    <Switch>
                        <Route exact path="/">
                            <div>
                                <p>Home</p>
                            </div>
                        </Route>
                        <Route path="/products">
                            <Products />
                        </Route>
                        <Route path="/create-product">
                            <CreateProduct />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
