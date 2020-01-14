import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import API_URL from "../js/api";
import { useSnackbar } from "notistack";

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "name" },
        {
          title: "Email",
          field: "email"
        },
        {
          title: "Usergroup",
          field: "userGroup",
          lookup: { 0: "Admin", 1: "Product Owner", 2: "Merchant" }
        }
      ],
      data: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    axios.get(API_URL + "users").then(response => {
      console.log(response.data);
      this.setState({ data: response.data });
    });
  }

  editUser(reqEmail, newData) {
    console.log("Email: " + reqEmail + " -- newData: ");
    console.log(newData);

    newData.oldEmail = reqEmail;

    axios
      .post(API_URL + "editUser", newData)
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          console.log("ok");
        } else {
          console.log("no ok");
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  deleteUser() {}

  render() {
    return (
      <MaterialTable
        title="All Users"
        columns={this.state.columns}
        data={this.state.data}
        options={{ actionsColumnIndex: -1 }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  this.editUser(oldData.email, newData);
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve();
              }, 1000);
            })
        }}
      />
    );
  }
}
