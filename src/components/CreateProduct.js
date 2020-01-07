import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import ProductEditor from "./ProductEditor";

export default function CreateProduct() {
    const classes = useStyles();

    return (
        <div>
            <ProductEditor title="Create new product" />
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: "50%",
        margin: "60px auto",
        boxShadow: "1px 2px 20px 1px#d4d4d4",
        padding: "30px",
        borderRadius: "25px",
        backgroundColor: "white"
    }
}));
