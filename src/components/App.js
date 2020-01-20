import React, { useState, useEffect } from "react";
import axios from "axios";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./Nav";
import Products from "./Products";
import CreateProduct from "./CreateProduct";
import CreateUser from "./CreateUser";
import Users from "./Users";
import Settings from "./Settings";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./UserContext";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import DeletedProducts from "./DeletedProducts";
import ProductsView from "./ProductsView";
import API_URL from "../js/api";
import ProductView from "./ProductView";

axios.defaults.withCredentials = true;

function App() {
    const [authorization, setAuthorization] = useState({
        email: "",
        userGroup: null,
        name: ""
    });

    const USERGROUP = {
        ADMIN: "0",
        PRODUCT_OWNER: "1",
        SALESPERSON: "2"
    };

    const links = [
        { name: "Home", url: "/" },
        { name: "Products", url: "/products" }
    ];

    if (authorization.userGroup) {
        links.push({ name: "Create product", url: "/create-product" });
    }

    if (authorization.userGroup === USERGROUP.ADMIN) {
        links.push({ name: "Users", url: "/users" });
        links.push({ name: "Create user", url: "/create-user" });
        links.push({ name: "Deleted products", url: "/deleted-products" });
    }

    useEffect(() => {
        getLoginState();
        setInterval(getLoginState, 1000 * 60); // Read login state every minute
    }, []);

    function getLoginState() {
        axios
            .get(API_URL + "session")
            .then(response => {
                const { email, name, userGroup } = response.data;
                if (email && userGroup) {
                    setAuthorization({ email, name, userGroup });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <UserProvider value={authorization}>
                    <SnackbarProvider preventDuplicate maxSnack={3}>
                        <Router>
                            <Nav
                                links={links}
                                authorization={authorization}
                                setAuthorization={setAuthorization}
                            />
                            <div>
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={ProductsView}
                                    />
                                    <Route path="/products-old">
                                        <Products />
                                    </Route>
                                    <Route
                                        path="/products"
                                        component={ProductsView}
                                    />
                                    <Route path="/product/:id">
                                        <ProductView />
                                    </Route>
                                    <Route path="/settings">
                                        <Settings />
                                    </Route>
                                    <Route path="/users">
                                        <Users />
                                    </Route>
                                    <Route path="/deleted-products">
                                        <DeletedProducts />
                                    </Route>
                                    <Route path="/create-product">
                                        {authorization.userGroup ? (
                                            <CreateProduct />
                                        ) : (
                                            <div>Not found</div>
                                        )}
                                    </Route>
                                    <Route path="/create-user">
                                        {authorization.userGroup ===
                                        USERGROUP.ADMIN ? (
                                            <CreateUser />
                                        ) : (
                                            <div>Not found</div>
                                        )}
                                    </Route>
                                </Switch>
                            </div>
                        </Router>
                    </SnackbarProvider>
                </UserProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
