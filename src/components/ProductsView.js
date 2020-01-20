import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ProductCard from "./ProductCard";
import API_URL from "../js/api";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import UserContext from "./UserContext";
import SearchField from "./SearchField";

export default function ProductsView() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [queryHasChanged, setQueryHasChanged] = useState(false);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        myProducts: false,
        isIdea: false,
        isParticipant: false,
        isClassified: false
    });

    const user = useContext(UserContext);

    useEffect(() => {
        if (!isSearching) {
            setIsSearching(true);
            axios
                .get(API_URL + "products", {
                    params: {
                        filters,
                        search
                    }
                })
                .then(response => {
                    setProducts(response.data);
                })
                .catch(err => console.log(err.message))
                .finally(() => setIsSearching(false));
            console.log(1);
        }
    }, [filters, user, search]);

    const handleFilterChange = e => {
        setFilters({ ...filters, [e.target.name]: e.target.checked });
    };

    return (
        <div className={classes.root}>
            <div className={classes.searchField}>
                <SearchField onSearch={e => setSearch(e.target.value)} />
            </div>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Ehdot</FormLabel>
                <FormGroup>
                    {user.userGroup ? (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.myProducts}
                                    color="primary"
                                    onChange={handleFilterChange}
                                    name="myProducts"
                                />
                            }
                            label="Luomani"
                        />
                    ) : null}
                    {user.userGroup ? (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.isParticipant}
                                    color="primary"
                                    onChange={handleFilterChange}
                                    name="isParticipant"
                                />
                            }
                            label="Osallinen"
                        />
                    ) : null}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filters.ideas}
                                color="primary"
                                name="isIdea"
                                onChange={handleFilterChange}
                            />
                        }
                        label="Ideat"
                    />
                    {user.userGroup ? (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.classifieds}
                                    color="primary"
                                    onChange={handleFilterChange}
                                    name="isClassified"
                                />
                            }
                            label="Salaiset"
                        />
                    ) : null}
                </FormGroup>
            </FormControl>
            <Grid container spacing={3}>
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </Grid>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
        textAlign: "left"
    },
    searchField: {
        width: 200
    },
    formControl: {
        margin: theme.spacing(3)
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
