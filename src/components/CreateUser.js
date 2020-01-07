import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useSnackbar } from "notistack";
import API_URL from "../js/api";
import axios from "axios";

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
        const { name, email, password, confirmPassword, userGroup } = input;

        if (password !== confirmPassword) {
            setErrors({ ...errors, confirmPassword: true });
            return;
        }
        console.log(input);

        axios
            .post(API_URL + "newUser", { name, email, password, userGroup })
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    setInput(emptyInput);
                    enqueueSnackbar("User created", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "center"
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err.response);
                enqueueSnackbar("User creation failed", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center"
                    }
                });
            });
    };

    const handleChange = e => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    return (
        <div className={classes.root}>
            <TextField
                name="name"
                label="Name"
                value={input.name}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="email"
                label="Email"
                type="email"
                value={input.email}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                name="password"
                label="Password"
                type="password"
                value={input.password}
                onChange={handleChange}
                fullWidth
            />
            <TextField
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
            />
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={input.userGroup}
                onChange={handleChange}
                name="userGroup"
                fullWidth
            >
                <MenuItem value={2}>Salesperson (2)</MenuItem>
                <MenuItem value={1}>Product owner (1)</MenuItem>
                <MenuItem value={0}>Admin (0)</MenuItem>
            </Select>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        width: 700,
        margin: "auto",
        "& > *": {
            margin: theme.spacing(1)
        }
    }
}));

export default CreateUser;
