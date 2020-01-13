import React, { useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";

export default function Users() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "email", field: "email" },
      {
        title: "Usergroup",
        field: "usergroup",
        type: "numeric",
        lookup: { 0: "admin", 1: "Product owner", 2: "Merchant :-D" }
      }
    ],
    data: [
      { name: "Mehmet", email: "Baran", birthYear: 1987, usergroup: 2 },
      {
        name: "Zerya Betül",
        email: "Baran",
        birthYear: 2017,
        usergroup: 2
      }
    ]
  });

  return (
    <MaterialTable
      title="All Users"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
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
