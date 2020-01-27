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
<<<<<<< HEAD
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
=======
import AuthorizedRoute from "./AuthorizedRoute";
>>>>>>> 4e7a47453c053f58b9d904621c8b8e0e020d1101

axios.defaults.withCredentials = true;
console.log(process.env.REACT_APP_API_URL);

const drawerWidth = 240;

function App() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();

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

<<<<<<< HEAD
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserProvider value={authorization}>
          <SnackbarProvider preventDuplicate maxSnack={3}>
            <Router>
              <CssBaseline />
              <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: open
                })}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                      [classes.hide]: open
                    })}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Nav
                    open={open}
                    setOpen={setOpen}
                    authorization={authorization}
                    setAuthorization={setAuthorization}
                  />
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open
                })}
                classes={{
                  paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                  })
                }}
              >
                <div className={classes.toolbar}>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon />
                    ) : (
                      <ChevronLeftIcon />
                    )}
                  </IconButton>
                </div>
                <Divider />
                <List>
                  {links.map((link, index) => (
                    <Link to={link.url} className={classes.link}>
                      <ListItem button key={link.name}>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={link.name} />
                      </ListItem>
                    </Link>
                  ))}
                  <Divider />
                </List>
                <List>
                  <Link to={"/settings"} className={classes.link}>
                    <ListItem button key={"Settings"}>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Settings"} />
                    </ListItem>
                  </Link>
                </List>
              </Drawer>
              <div className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                  <Route exact path="/" component={ProductsView} />
                  <Route path="/products-old">
                    <Products />
                  </Route>
                  <Route path="/products" component={ProductsView} />
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
=======
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
>>>>>>> 4e7a47453c053f58b9d904621c8b8e0e020d1101
}

export default App;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  link: {
    color: "black"
  }
}));
