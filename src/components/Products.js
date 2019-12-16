import React from "react";
import axios from "axios";
import Product from "./Product";
import Sidebar from "./Sidebar";
import SearchField from "./SearchField";
import API_URL from "../js/api";

export default class Products extends React.Component {
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
        const { currentProduct } = this.state;
        const selectedItem = currentProduct ? currentProduct._id : "";

        const myProducts = this.state.products.filter(
            product =>
                (product.creator === "admin@admin.com" ||
                    product.productOwner === "admin@admin.com" ||
                    product.salesPerson === "admin@admin.com") &&
                product.isIdea === false
        );

        const ideas = this.state.products.filter(product => product.isIdea);

        const publicProducts = this.state.products.filter(
            product => !myProducts.includes(product) && !product.isIdea
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
                    <Sidebar
                        setProduct={this.setProduct}
                        selected={selectedItem}
                        products={ideas}
                        name="Ideat"
                    />
                    <Sidebar
                        setProduct={this.setProduct}
                        selected={selectedItem}
                        products={publicProducts}
                        name="Julkiset tuotteet"
                    />
                </div>
                <Product product={this.state.currentProduct} />
            </div>
        );
    }
}
