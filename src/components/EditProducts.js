import React, { useState } from "react";
import Sidebar from "./Sidebar";
import SearchField from "./SearchField";
import UserContext from "./UserContext";
import axios from "axios";
import API_URL from "../js/api";
import EditProduct from "./EditProduct";

export default class EditProducts extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            currentProduct: null,
            products: []
        };
    }

    componentDidMount() {
        this.getProducts();
    }

    onSearch = event => {
        this.setState({ searchQuery: event.target.value });
    };

    getProducts() {
        axios.get(API_URL + "products").then(response => {
            console.log(response.data);
            this.setState({ products: response.data });
        });
    }

    setProduct = product => {
        this.setState({
            currentProduct:
                this.state.currentProduct === product ? null : product
        });
    };

    render() {
        const user = this.context;
        const { currentProduct } = this.state;
        const selectedItem = currentProduct ? currentProduct._id : "";

        const myProducts = this.state.products.filter(
            product =>
                product.creator === user.email ||
                product.productOwner === user.email ||
                product.salesPerson === user.email
        );

        return (
            <div className="products">
                <div className="sidebar">
                    <SearchField onSearch={this.onSearch} />
                    <Sidebar
                        defaultExpanded
                        setProduct={this.setProduct}
                        selected={selectedItem}
                        products={myProducts}
                        name="Omat tuotteet"
                    />
                </div>
                <EditProduct product={this.state.currentProduct} />
            </div>
        );
    }
}
