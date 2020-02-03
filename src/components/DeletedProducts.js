import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import API_URL from "../js/api";

export default class DeletedProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: "Product name", field: "productName" },
                {
                    title: "Product owner",
                    field: "productOwner"
                },
                {
                    title: "Lifecycle status",
                    field: "lifecycleStatus"
                },
                {
                    title: "Business type",
                    field: "businessType"
                }
            ],
            data: []
        };
    }

    componentDidMount() {
        this.getDeletedProducts();
    }

    getDeletedProducts() {
        axios
            .get(API_URL + "deletedProducts")
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    restoreProduct(product) {
        axios
            .post(API_URL + "restoreProduct", product)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
            });
    }

    render() {
        return (
            <MaterialTable
                title="Deleted products"
                columns={this.state.columns}
                data={this.state.data}
                options={{ actionsColumnIndex: -1 }}
                actions={[
                    {
                        icon: "restoreIcon",
                        tooltip: "Restore product",
                        onClick: (event, rowData) => {
                            this.restoreProduct(rowData);
                            let data = [...this.state.data];
                            const index = data.indexOf(rowData);
                            data.splice(index, 1);
                            this.setState({ data });
                        }
                    }
                ]}
            />
        );
    }
}
