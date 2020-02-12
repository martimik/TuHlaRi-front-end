import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useSnackbar } from "notistack";
import API_URL from "../js/api";
import axios from "axios";
import Paper from "@material-ui/core/Paper";

const CreateUser = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const emptyInput = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userGroup: 2
    };
    const [input, setInput] = useState(emptyInput);

    const [errors, setErrors] = useState({
        name: false,
        email: false,
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

    const handleSubmit = () => {
        const { password, confirmPassword } = input;

        if (password !== confirmPassword) {
            setErrors({ ...errors, confirmPassword: true });
            return;
        }

        axios
            .post(API_URL + "newUser", input)
            .then(res => {
                console.log(res);
                setInput(emptyInput);
                enqueueSnackbar(res.data.message, {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right"
                    }
                });
            })
            .catch(err => {
                console.log(err.response);
                enqueueSnackbar(err.response.data.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right"
                    }
                });
            });
    };

    const handleChange = e => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    return (
        <Paper elevation={2} className={classes.root}>
            <h1 className={classes.header}>Create User</h1>
            <div className={classes.fields}>
                <TextField
                    id="name-textfield"
                    name="name"
                    label="Name"
                    value={input.name}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    id="email-textfield"
                    name="email"
                    label="Email"
                    type="email"
                    value={input.email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    id="password-textfield"
                    name="password"
                    label="Password"
                    type="password"
                    value={input.password}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    id="password-confirm-textfield"
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    value={input.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    error={errors.confirmPassword}
                    variant="outlined"
                    helperText={
                        errors.confirmPassword ? "Passwords do not match" : ""
                    }
                />
                <Select
                    labelId="demo-simple-select-label"
                    id="user-group-select"
                    value={input.userGroup}
                    onChange={handleChange}
                    name="userGroup"
                    fullWidth
                    variant="outlined"
                    style={{ marginTop: "20px" }}
                >
                    <MenuItem value={2}>Salesperson (2)</MenuItem>
                    <MenuItem value={1}>Product owner (1)</MenuItem>
                    <MenuItem value={0}>Admin (0)</MenuItem>
                </Select>
                <Button
                    id="create-user-button"
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                        !input.name ||
                        !input.email ||
                        !input.password ||
                        !input.confirmPassword
                    }
                    style={{ width: "100%" }}
                >
                    Create new user
                </Button>
            </div>
        </Paper>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        maxWidth: 1000,
        padding: theme.spacing(4)
    },
    fields: {
        maxWidth: 600,
        margin: "auto",
        "& > *": {
            margin: theme.spacing(1)
        }
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

export default CreateUser;
