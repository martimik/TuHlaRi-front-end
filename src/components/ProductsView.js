import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ProductView from "./ProductView";
import API_URL from "../js/api";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

export default function ProductsView() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get(API_URL + "products")
            .then(response => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch(err => console.log(err.message));
    }, []);

    return (
        <div className={classes.root}>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox checked={true} value="Omat" color="primary" />
                    }
                    label="Omat tuotteet"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={true}
                            value="checkeda"
                            color="primary"
                        />
                    }
                    label="Ideat"
                />
            </FormGroup>
            <Grid container spacing={3}>
                {products.map(product => (
                    <ProductView product={product} />
                ))}
            </Grid>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2)
    },
    image: {
        width: 128,
        height: 128
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%"
    }
}));
