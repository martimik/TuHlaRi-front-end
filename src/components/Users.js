import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import API_URL from "../js/api";

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
            this.setState({ data: response.data });
        });
    }

    editUser(reqEmail, newData) {
        newData.reqEmail = reqEmail;

        axios
            .post(API_URL + "editUser", newData)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    console.log("ok");
                    const data = [...this.state.data];
                    const index = data.findIndex(
                        data => data.email === reqEmail
                    );
                    data[index] = newData;
                    this.setState({ data });
                    this.props.enqueueSnackbar(reqEmail + " edited", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right"
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err.response);
                this.props.enqueueSnackbar("Failed to edit " + reqEmail, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right"
                    }
                });
            });
    }

    deleteUser(userData) {
        const email = userData.email;
        axios
            .post(API_URL + "deleteUser", { email: email })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    let data = [...this.state.data];
                    const index = data.indexOf(userData);
                    data.splice(index, 1);
                    this.setState({ data });

                    this.props.enqueueSnackbar(email + " deleted", {
                        variant: "success",
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right"
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err.response);
                this.props.enqueueSnackbar("Failed to delete " + email, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right"
                    }
                });
            });
    }

    render() {
        return (
            <MaterialTable
                title="All Users"
                columns={this.state.columns}
                data={this.state.data}
                options={{ actionsColumnIndex: -1 }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                {
                                    this.editUser(oldData.email, newData);
                                    resolve();
                                }
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                {
                                    this.deleteUser(oldData);
                                    resolve();
                                }
                                resolve();
                            }, 1000);
                        })
                }}
            />
        );
    }
}
