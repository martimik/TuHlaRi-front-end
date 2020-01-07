import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

export default function Nav(props) {
    const classes = useStyles();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { authorization, setAuthorization } = props;

    function openCloseLoginWindow() {
        setIsLoginOpen(!isLoginOpen);
    }

    return (
        <nav className={classes.root}>
            <ul>
                {props.links.map((link, i) => (
                    <li key={i}>
                        <Link to={link.url}>
                            <Button className={classes.button}>
                                {link.name}
                            </Button>
                        </Link>
                    </li>
                ))}
            </ul>
            <Button
                onClick={openCloseLoginWindow}
                color="primary"
                className={classes.button}
            >
                {authorization.email ? "Logged in" : "Login"}{" "}
                <KeyboardArrowDown
                    className={
                        isLoginOpen
                            ? classes.loginIconUp
                            : classes.loginIconDown
                    }
                />
            </Button>
            <Login
                isOpen={isLoginOpen}
                close={() => setIsLoginOpen(false)}
                setAuthorization={setAuthorization}
                authorization={authorization}
            />
        </nav>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        justifyContent: "space-between",
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
        marginRight: "20px",
        padding: "10px 10px",
        "&:hover": {
            backgroundColor: "a90018"
        }
    }
}));
