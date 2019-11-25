import React from "react";
import Product from "./Product";

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Product />
            </div>
        );
    }
}
