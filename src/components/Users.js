import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import API_URL from "../js/api";
import PropTypes from "prop-types";

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

    async editUser(reqEmail, newData) {
        newData.reqEmail = reqEmail;
        try {
            await axios.post(API_URL + "editUser", newData);

            const data = [...this.state.data];
            const index = data.findIndex(data => data.email === reqEmail);
            data[index] = newData;
            this.setState({ data });
            this.props.enqueSnackbar(reqEmail + " edited", {
                variant: "success",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                }
            });
            return true;
        } catch (err) {
            console.log(err.response);
            this.props.enqueSnackbar("Failed to edit " + reqEmail, {
                variant: "error",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                }
            });
            return false;
        }
    }

    async deleteUser(userData) {
        const email = userData.email;
        try {
            await axios.post(API_URL + "deleteUser", { email: email });

            const data = [...this.state.data];
            const index = data.indexOf(userData);
            data.splice(index, 1);
            this.setState({ data });

            this.props.enqueSnackbar(email + " deleted", {
                variant: "success",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                }
            });
            return true;
        } catch (err) {
            console.log(err.response);
            this.props.enqueSnackbar("Failed to delete " + email, {
                variant: "error",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                }
            });
            return false;
        }
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
                        new Promise(async (resolve, reject) => {
                            if (await this.editUser(oldData.email, newData)) {
                                resolve();
                            } else {
                                reject();
                            }
                        }),
                    onRowDelete: data =>
                        new Promise(async (resolve, reject) => {
                            if (await this.deleteUser(data)) {
                                resolve();
                            } else {
                                reject();
                            }
                        })
                }}
            />
        );
    }
}

Users.propTypes = {
    enqueSnackbar: PropTypes.func
};

Users.defaultProps = {
    enqueSnackbar: msg => console.log(msg)
};
