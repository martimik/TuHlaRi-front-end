import React from "react";
import Product from "./Product";
import Sidebar from "./Sidebar";
import SearchField from "./SearchField";
import products from "../js/TestData";

const CATEGORY = {
    USER_PRODUCTS: 0,
    PUBLIC_PRODUCTS: 1,
    USER_IDEAS: 2
};

export default class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: products,
            currentProduct: 0,
            currentCategory: 0
        };
    }

    onSearch = event => {
        this.setState({ searchQuery: event.target.value });
    };

    setProduct = (product, category) => {
        this.setState({ currentProduct: product, currentCategory: category });
    };

    render() {
        const { currentCategory, currentProduct } = this.state;

        return (
            <div className="products">
                <div className="sidebar">
                    <SearchField onSearch={this.onSearch} />
                    <Sidebar
                        defaultExpanded
                        setProduct={this.setProduct}
                        category={CATEGORY.USER_PRODUCTS}
                        selected={
                            currentCategory === CATEGORY.USER_PRODUCTS
                                ? currentProduct
                                : -1
                        }
                        name="Omat tuotteet"
                        products={this.state.products[0]}
                    />
                    <Sidebar
                        setProduct={this.setProduct}
                        category={CATEGORY.PUBLIC_PRODUCTS}
                        selected={
                            currentCategory === CATEGORY.PUBLIC_PRODUCTS
                                ? currentProduct
                                : -1
                        }
                        name="Ideat"
                        products={this.state.products[1]}
                    />
                    <Sidebar
                        setProduct={this.setProduct}
                        category={CATEGORY.USER_IDEAS}
                        selected={
                            currentCategory === CATEGORY.USER_IDEAS
                                ? currentProduct
                                : -1
                        }
                        name="Julkiset tuotteet"
                        products={this.state.products[2]}
                    />
                </div>
                <Product
                    product={
                        this.state.products[currentCategory][currentProduct]
                    }
                />
            </div>
        );
    }
}
