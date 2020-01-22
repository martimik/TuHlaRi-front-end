import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import { useParams } from "react-router-dom";
import API_URL from "../js/api";
import ProductEditor from "./ProductEditor";
import makeStyles from "@material-ui/styles/makeStyles";

const ProductView = () => {
    const classes = useStyles();
    const [product, setProduct] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios
                .get(API_URL + "product/" + id)
                .then(res => setProduct(res.data))
                .catch(err => console.log(err));
        }
    }, [id]);

    const onEdit = () => {
        axios
            .get(API_URL + "product/" + id)
            .then(res => {
                setProduct(res.data);
                setIsEditMode(false);
            })
            .catch(err => console.log(err));
    };

    const deleteProduct = () => {
        axios
            .delete(API_URL + "product/" + id)
            .then(res => setProduct(null))
            .catch(err => console.log(err.response));
    };

    const toggleEditMode = () => {
        setIsEditMode(state => !state);
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className={classes.root}>
            {isEditMode ? (
                <ProductEditor
                    product={product}
                    toggleEditMode={toggleEditMode}
                    onEdit={onEdit}
                    onDelete={deleteProduct}
                />
            ) : (
                <Product
                    product={product}
                    toggleEditMode={
                        product.isAllowedToEdit ? toggleEditMode : null
                    }
                />
            )}
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(4)
    }
}));

export default ProductView;
