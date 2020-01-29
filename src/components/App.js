import React, { useState, useEffect } from "react";
import axios from "axios";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
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
import { makeStyles } from "@material-ui/core/styles";
import AuthorizedRoute from "./AuthorizedRoute";

axios.defaults.withCredentials = true;

function App() {
    const classes = useStyles();
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

    const getLoginState = () => {
        axios
            .get(API_URL + "session")
            .then(response => {
                const { email, name, userGroup } = response.data;
                if (email && userGroup && email) {
                    setAuthorization({ email, name, userGroup });
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getLoginState();
        setInterval(getLoginState, 1000 * 60); // Read login state every minute
    }, []);

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <UserProvider value={authorization}>
                    <SnackbarProvider preventDuplicate maxSnack={3}>
                        <Router>
                            <Nav
                                authorization={authorization}
                                setAuthorization={setAuthorization}
                            />
                            <div className={classes.content}>
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
                                    <AuthorizedRoute
                                        authorized={Boolean(
                                            authorization.userGroup
                                        )}
                                        path="/settings"
                                        component={Settings}
                                    />
                                    <AuthorizedRoute
                                        authorized={
                                            authorization.userGroup ===
                                            USERGROUP.ADMIN
                                        }
                                        path="/users"
                                        component={Users}
                                    />
                                    <AuthorizedRoute
                                        authorized={
                                            authorization.userGroup ===
                                            USERGROUP.ADMIN
                                        }
                                        path="/deleted-products"
                                        component={DeletedProducts}
                                    />
                                    <AuthorizedRoute
                                        authorized={Boolean(
                                            authorization.userGroup
                                        )}
                                        path="/create-product"
                                        component={CreateProduct}
                                    />
                                    <AuthorizedRoute
                                        authorized={
                                            authorization.userGroup ===
                                            USERGROUP.ADMIN
                                        }
                                        path="/create-user"
                                        component={CreateUser}
                                    />
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

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: 56
    }
}));
