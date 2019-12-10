import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./Nav";
import Products from "./Products";
import CreateProduct from "./CreateProduct";
import { SnackbarProvider } from "notistack";

axios.defaults.withCredentials = true;

function App() {
  const links = [
    { name: "Home", url: "/" },
    { name: "Products", url: "products" },
    { name: "Create product", url: "create-product" }
  ];
  const [authorization, setAuthorization] = useState({
    email: "",
    userGroup: null,
    name: ""
  });
  function getLoginState() {
    axios
      .get("http://localhost:8080/")
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

  useEffect(() => {
    getLoginState();
  }, []);

  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
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
                  <p onClick={getLoginState}>Home</p>
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
