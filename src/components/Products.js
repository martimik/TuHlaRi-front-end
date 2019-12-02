import React from "react";
import Product from "./Product";
import Sidebar from "./Sidebar";
import SearchField from "./SearchField";
import products from "../js/TestData";
import { products2, products3 } from "../js/TestData";

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProduct: null
        };
    }

    onSearch = event => {
        this.setState({ searchQuery: event.target.value });
    };

    setProduct = product => {
        this.setState({
            currentProduct:
                this.state.currentProduct === product ? null : product
        });
    };

    render() {
        const { currentProduct } = this.state;
        const selectedItem = currentProduct ? currentProduct.id : "";

        return (
            <div className="products">
                <div className="sidebar">
                    <SearchField onSearch={this.onSearch} />
                    <Sidebar
                        defaultExpanded
                        setProduct={this.setProduct}
                        selected={selectedItem}
                        products={products}
                        url="http://10.99.104.41:8080/search/allProducts"
                        name="Omat tuotteet"
                    />
                    <Sidebar
                        setProduct={this.setProduct}
                        selected={selectedItem}
                        products={products2}
                        name="Ideat"
                    />
                    <Sidebar
                        setProduct={this.setProduct}
                        selected={selectedItem}
                        products={products3}
                        name="Julkiset tuotteet"
                    />
                </div>
                <Product product={this.state.currentProduct} />
            </div>
        );
    }
}
