import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import API_URL from "../js/api";
import PropTypes from "prop-types";

export default function Login(props) {
    const classes = useStyles();
    const [credentials, setCredentials] = useState({ user: "", password: "" });
    const { isOpen, setAuthorization, close } = props;
    const { enqueueSnackbar } = useSnackbar();

    function handleChange(event) {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }

    function login(event) {
        event.preventDefault();
        axios
            .post(
                API_URL + "login",
                {},
                {
                    auth: {
                        username: credentials.user,
                        password: credentials.password
                    }
                }
            )
            .then(response => {
                const { email, name, userGroup } = response.data;
                if (email && userGroup) {
                    setAuthorization({ email, name, userGroup });
                    setCredentials({ user: "", password: "" });
                    enqueueSnackbar("Successfully logged in", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right"
                        }
                    });
                    close();
                } else {
                    enqueueSnackbar("Failed to login", {
                        variant: "error",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right"
                        }
                    });
                }
            })

            .catch(error => {
                console.error(error);
                enqueueSnackbar("Failed to login", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right"
                    }
                });
            });
    }

    const fieldsAreEmpty = () => !credentials.user || !credentials.password;

    return (
        <div className={isOpen ? "login login-open" : "login login-closed"}>
            <form className={classes.form} onSubmit={login}>
                <TextField
                    onChange={handleChange}
                    id="auth-email-textfield"
                    label="Email"
                    name="user"
                    className={classes.textField}
                    autoComplete="current-password"
                    margin="normal"
                    value={credentials.user}
                />

                <TextField
                    onChange={handleChange}
                    id="auth-password-textfield"
                    label="Password"
                    name="password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    value={credentials.password}
                />
                <Button
                    id="login-button"
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={fieldsAreEmpty()}
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

Login.propTypes = {
    isOpen: PropTypes.bool,
    setAuthorization: PropTypes.func,
    close: PropTypes.func
};
