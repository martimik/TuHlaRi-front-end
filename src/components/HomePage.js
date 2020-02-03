import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function Homepage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Welcome!</h1>
      <h2 className={classes.content}>
        TuHlaRi - a product management application
      </h2>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    marginTop: "15vh"
  },
  title: {
    fontSize: "40px",
    fontWeight: 300
  },
  content: {
    fontWeight: 300
  }
});
