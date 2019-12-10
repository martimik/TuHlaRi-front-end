import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

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
    console.log(credentials);
    axios
      .post(
        "http://localhost:8080/login",
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
          enqueueSnackbar("Successfully logged in", { variant: "success" });
          close();
        } else {
          enqueueSnackbar("Failed to login", { variant: "error" });
        }
      })

      .catch(error => {
        console.error(error);
      });
  }

  function logout(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/logout")
      .then(response => {
        const { email, name, userGroup } = response.data;
        setAuthorization({ email, name, userGroup });
        enqueueSnackbar("Successfully logged out", { variant: "info" });
        close();
      })
      .catch(error => {
        console.error(error);
      });
  }

  if (props.authorization.email) {
    return (
      <div className={isOpen ? "login login-open" : "login login-closed"}>
        <form className={classes.form} onSubmit={logout}>
          <Button
            type="submit"
            className={classes.root}
            variant="contained"
            color="primary"
          >
            Logout
          </Button>
        </form>
      </div>
    );
  } else {
    return (
      <div className={isOpen ? "login login-open" : "login login-closed"}>
        <form className={classes.form} onSubmit={login}>
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
