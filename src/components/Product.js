import React from "react";

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        if (this.props.product) {
            return (
                <div className="product">
                    <div className="product-header">
                        <h1>{this.props.product.name}</h1>{" "}
                        <img
                            className="logo-large"
                            src={this.props.product.image}
                        ></img>
                    </div>
                    <div>
                        <p className="product-short-description">
                            {this.props.product.shortDescription}
                        </p>
                    </div>
                    <div>
                        <p className="product-long-description">
                            {this.props.product.longDescription}
                        </p>
                        <div className="product-info-list">
                            <div>
                                <p>Teknologiat</p>
                                <ul>
                                    {this.props.product.technologies.map(
                                        (technology, i) => (
                                            <li key={i}>{technology}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div>
                                <p>Komponentit</p>
                                <ul>
                                    {this.props.product.components.map(
                                        (component, i) => (
                                            <li key={i}>{component}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                        <p className="product-requirement">
                            {this.props.product.requirement || null}
                        </p>
                        <p className="product-customer">
                            {this.props.product.customer || null}
                        </p>
                        <p className="product-lifecycle">
                            {this.props.product.lifecycle || null}
                        </p>
                        <p className="product-business-owner">
                            {this.props.product.businessOwner || null}
                        </p>
                        <p className="product-pricing">
                            {this.props.product.pricing || null}
                        </p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Please select item</p>
                </div>
            );
        }
    }
}
