import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export default function Login(props) {
    const classes = useStyles();
    const [credentials, setCredentials] = useState({ user: "", password: "" });
    const { isOpen } = props;

    function handleChange(event) {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(credentials);
        axios
            .post(
                "http://10.99.104.48:8080/login",
                {},
                {
                    auth: {
                        username: credentials.user,
                        password: credentials.password
                    }
                }
            )
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className={isOpen ? "login login-open" : "login login-closed"}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    onChange={handleChange}
                    id="standard-password-input"
                    label="Username"
                    name="user"
                    className={classes.textField}
                    autoComplete="current-password"
                    margin="normal"
                    value={credentials.user}
                />

                <TextField
                    onChange={handleChange}
                    id="standard-password-input"
                    label="Password"
                    name="password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    value={credentials.password}
                />
                <Button
                    type="submit"
                    className={classes.root}
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
            </form>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
    form: {
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        borderRadius: "1.5rem"
    }
}));
