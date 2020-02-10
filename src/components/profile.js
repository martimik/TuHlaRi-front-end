import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import axios from "axios";
import API_URL from "../js/api";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

export default function Profile() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const emptyInput = {
        oldPassword: "",
        password: "",
        confirmPassword: ""
    };
    const [input, setInput] = useState(emptyInput);

    const [errors, setErrors] = useState({
        password: false,
        confirmPassword: false
    });

    useEffect(() => {
        if (
            errors.confirmPassword &&
            input.password === input.confirmPassword
        ) {
            setErrors({ ...errors, confirmPassword: false });
        }
    }, [input, errors]);

    const handleChange = e => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    function handleSubmit(event) {
        event.preventDefault();

        const { oldPassword, password, confirmPassword } = input;

        if (password !== confirmPassword) {
            setErrors({ ...errors, confirmPassword: true });
            return;
        }
        console.log(input);

        axios
            .post(API_URL + "editPassword", { oldPassword, password })
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    setInput(emptyInput);
                    enqueueSnackbar("Password changed.", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center"
                        }
                    });
                } else {
                    setInput(emptyInput);
                    enqueueSnackbar(res.data.message, {
                        variant: "error",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center"
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err.response);
                enqueueSnackbar("Password update failed.", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center"
                    }
                });
            });
    }

    return (
        <Paper elevation={2} className={classes.root}>
            <h1 className={classes.header}>Change Password</h1>
            <TextField
                id="old-password-textfield"
                name="oldPassword"
                label="Old Password"
                value={input.oldPassword}
                onChange={handleChange}
                fullWidth
                type="password"
                variant="outlined"
            />
            <TextField
                id="new-password-textfield"
                name="password"
                label="New password"
                type="password"
                value={input.password}
                onChange={handleChange}
                fullWidth
                variant="outlined"
            />
            <TextField
                id="confirm-password-textfield"
                name="confirmPassword"
                label="Confirm password"
                type="password"
                value={input.confirmPassword}
                onChange={handleChange}
                fullWidth
                error={errors.confirmPassword}
                helperText={
                    errors.confirmPassword ? "Passwords do not match" : ""
                }
                variant="outlined"
            />
            <Button
                id="change-password-button"
                style={{ width: "100%" }}
                color="primary"
                variant="contained"
                onClick={handleSubmit}
            >
                Change password
            </Button>
        </Paper>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 600,
        margin: "60px auto",
        "& > *": {
            margin: theme.spacing(1)
        },
        padding: "30px"
    },
    header: {
        fontFamily: "Roboto",
        fontWeight: 300,
        fontStyle: "italic",
        margin: "20px auto",
        position: "relative",
        textAlign: "center"
    }
}));
