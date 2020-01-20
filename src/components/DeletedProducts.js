import React from "react";
import MaterialTable from "material-table";
import axios from "axios";
import API_URL from "../js/api";
import RestoreIcon from "@material-ui/icons/Restore";
import { useSnackbar } from "notistack";

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
    axios.get(API_URL + "deletedProducts").then(response => {
      console.log(response.data);
      this.setState({ data: response.data });
    });
  }

  restoreProduct(product) {
    console.log(product);
    product.deleted = false;
    axios
      .post(API_URL + "editProduct", product)
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
        title="All Users"
        columns={this.state.columns}
        data={this.state.data}
        options={{ actionsColumnIndex: -1 }}
        actions={[
          {
            icon: "restoreIcon",
            tooltip: "Restore product",
            onClick: (event, rowData) => this.restoreProduct(rowData)
          }
        ]}
      />
    );
  }
}
