import React, { useState, useEffect } from "react";
import axios from "axios";
import { HashRouter as Router } from "react-router-dom";
import Nav from "./Nav";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./UserContext";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import API_URL from "../js/api";
import { makeStyles } from "@material-ui/core/styles";
import Routes from "./Routes";

axios.defaults.withCredentials = true;

function App() {
    const classes = useStyles();
    const [authorization, setAuthorization] = useState({
        email: "",
        userGroup: null,
        name: ""
    });

    const links = [
        { name: "Home", url: "/" },
        { name: "Products", url: "/products" }
    ];

    if (authorization.userGroup) {
        links.push({ name: "Create product", url: "/create-product" });
    }

    if (authorization.userGroup === "0") {
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
                                <Routes authorization={authorization} />
                            </div>
                        </Router>
                    </SnackbarProvider>
                </UserProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;

const useStyles = makeStyles({
    content: {
        flexGrow: 1,
        marginTop: 56
    }
});
