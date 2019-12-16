import React, { useState, useEffect } from "react";
import axios from "axios";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./Nav";
import Products from "./Products";
import CreateProduct from "./CreateProduct";
import { SnackbarProvider } from "notistack";
import API_URL from "../js/api"

axios.defaults.withCredentials = true;

function App() {
  const [authorization, setAuthorization] = useState({
    email: "",
    userGroup: null,
    name: ""
  });

  const links = [
    { name: "Home", url: "/" },
    { name: "Products", url: "products" },
    { name: "Create product", url: "create-product" }
  ];

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
            </Switch>
          </div>
        </Router>
      </SnackbarProvider>
    </div>
  );
}

export default App;
