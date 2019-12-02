import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Fab from "@material-ui/core/Fab";

export default function Nav(props) {
    const classes = useStyles();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    function openCloseLoginWindow() {
        setIsLoginOpen(!isLoginOpen);
    }

    return (
        <nav className="nav-bar">
            <ul>
                {props.links.map((link, i) => (
                    <li key={i}>
                        <Button className={classes.button}>
                            <Link to={link.url}>{link.name}</Link>
                        </Button>
                    </li>
                ))}
            </ul>
            <Button
                onClick={openCloseLoginWindow}
                color="primary"
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
            <Login isOpen={isLoginOpen} />
        </nav>
    );
}

const useStyles = makeStyles({
    root: {
        background: "black",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        color: "white",
        height: 48,
        padding: "0 30px"
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
});
