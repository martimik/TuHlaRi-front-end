import React, { useState, useEffect } from "react";
import axios from "axios";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./Nav";
import Products from "./Products";
import CreateProduct from "./CreateProduct";
import Settings from "./Settings";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./UserContext";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import CreateUser from "./CreateUser";
import API_URL from "../js/api";

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
    { name: "Products", url: "products" }
  ];

  if (authorization.userGroup) {
    links.push({ name: "Create product", url: "create-product" });
  }

  if (authorization.userGroup === USERGROUP.ADMIN) {
    links.push({ name: "Create user", url: "create-user" });
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
                  <Route path="/settings">
                    <Settings />
                  </Route>
                  <Route path="/create-user">
                    {authorization.userGroup === USERGROUP.ADMIN ? (
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
