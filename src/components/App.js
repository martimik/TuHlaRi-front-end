import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import logo from "../logo.svg";
import Nav from "./Nav";
import Products from "./Products";

function App() {
    const array = [
        { name: "products", url: "products" },
        { name: "arr_nabbula2", url: "heh_kirjaudut_ulos" }
    ];

    return (
        <div className="App">
            <Router>
                <Nav links={array} />
                <div>
                    <Switch>
                        <Route path="/products">
                            <Products />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
