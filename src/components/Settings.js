import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import Profile from "./profile";

export default function Settings() {
  const classes = useStyles();

  return <Profile />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: 700,
    margin: "auto",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));
