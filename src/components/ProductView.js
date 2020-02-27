import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Product from "./Product";
import { useParams } from "react-router-dom";
import API_URL from "../js/api";
import ProductEditor from "./ProductEditor";
import makeStyles from "@material-ui/styles/makeStyles";
import ConfirmDialog from "./ConfirmDialog";
import { useSnackbar } from "notistack";
import DialogContentText from "@material-ui/core/DialogContentText";

const ProductView = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [product, setProduct] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);
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
                setIsEditMode(false);
                setProduct(res.data);
            })
            .catch(err => console.log(err));
    };

    const deleteProduct = () => {
        axios
            .delete(API_URL + "product/" + id)
            .then(() => {
                setProduct(null);
                setRedirect(true);
                enqueueSnackbar("Product deleted", {
                    variant: "info",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right"
                    }
                });
            })
            .catch(err => console.log(err.response));
    };

    const toggleEditMode = () => {
        setIsEditMode(state => !state);
    };

    if (redirect) return <Redirect to="/products" />;
    else if (!product) return <div>Loading...</div>;

    return (
        <div className={classes.root}>
            {isEditMode ? (
                <ProductEditor
                    product={product}
                    toggleEditMode={toggleEditMode}
                    onEdit={onEdit}
                    onDelete={() => setIsDialogOpen(true)}
                />
            ) : (
                <Product
                    product={product}
                    toggleEditMode={
                        product.isAllowedToEdit ? toggleEditMode : null
                    }
                />
            )}
            <ConfirmDialog
                isOpen={isDialogOpen}
                setOpen={setIsDialogOpen}
                onConfirm={deleteProduct}
                title="Confirm delete"
            >
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete product{" "}
                    {product.productName}?
                </DialogContentText>
            </ConfirmDialog>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(4)
    }
}));

export default ProductView;
