import React from "react";
import axios from "axios";
import Product from "./Product";
import Sidebar from "./Sidebar";
import SearchField from "./SearchField";
import UserContext from "./UserContext";
import API_URL from "../js/api";
import ProductEditor from "./ProductEditor";

export default class Products extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            currentProduct: null,
            products: [],
            isEditMode: false
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

    toggleEditMode = () => {
        this.setState({ isEditMode: !this.state.isEditMode });
    };

    render() {
        const user = this.context;
        const { currentProduct } = this.state;
        const selectedItem = currentProduct ? currentProduct._id : "";

        const myProducts = this.state.products.filter(
            product =>
                (product.creator === user.email ||
                    product.productOwner === user.email ||
                    product.salesPerson === user.email) &&
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
                <div className="product-container">
                    {this.state.isEditMode ? (
                        <ProductEditor
                            toggleEditMode={this.toggleEditMode}
                            product={this.state.currentProduct}
                            title="Edit product"
                        />
                    ) : (
                        <Product
                            product={this.state.currentProduct}
                            toggleEditMode={this.toggleEditMode}
                        />
                    )}
                </div>
            </div>
        );
    }
}
