import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Login from "./Login";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Drawer from "./Drawer";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { useSnackbar } from "notistack";
import API_URL from "../js/api";

const drawerWidth = 240;

export default function Nav(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { authorization, setAuthorization } = props;

    function openCloseLoginWindow() {
        setIsLoginOpen(!isLoginOpen);
    }

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const logout = async () => {
        try {
            await axios.post(API_URL + "logout");
            setAuthorization({ email: "", userGroup: null, name: "" });
            enqueueSnackbar("Successfully logged out", {
                variant: "info",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                }
            });
        } catch (e) {
            console.log(e);
            enqueueSnackbar("Failed to log out", {
                variant: "error",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                }
            });
        }
    };

    return (
        <div>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isDrawerOpen
                })}
            >
                <Toolbar className={classes.toolbar}>
                    <div>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: isDrawerOpen
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <div>
                        {authorization.email ? (
                            <Button
                                onClick={logout}
                                color="primary"
                                id="logout-button"
                                className={classes.button}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                onClick={openCloseLoginWindow}
                                color="primary"
                                id="toggle-login-button"
                                className={classes.button}
                            >
                                Login{" "}
                                <KeyboardArrowDown
                                    className={
                                        isLoginOpen
                                            ? classes.loginIconUp
                                            : classes.loginIconDown
                                    }
                                />
                            </Button>
                        )}
                        <Login
                            isOpen={isLoginOpen}
                            close={() => setIsLoginOpen(false)}
                            setAuthorization={setAuthorization}
                            authorization={authorization}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                isOpen={isDrawerOpen}
                setIsOpen={setIsDrawerOpen}
                authorization={authorization}
            />
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        justifyContent: "flex-end",
        height: "100%",
        width: "100%",
        "& ul": {
            listStyle: "none",
            margin: 0
        },
        "& li": {
            display: "inline-block"
        }
    },
    loginIconUp: {
        transform: "rotate(-180deg)",
        transition: "all 0.25s"
    },
    loginIconDown: {
        transition: "all 0.25s",
        transform: "rotate(0deg)"
    },
    button: {
        color: "white",
        marginRight: "20px"
    },
    settingsLink: {},
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
        marginLeft: 0
    },
    hide: {
        display: "none"
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(0, 1)
    }
}));

Nav.propTypes = {
    authorization: PropTypes.object,
    setAuthorization: PropTypes.func
};
