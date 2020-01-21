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
import Checkbox from "@material-ui/core/Checkbox";
import UserContext from "./UserContext";
import SearchField from "./SearchField";

axios.defaults.withCredentials = true;

export default function ProductsView() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [cancelTimeout, setCancelTimeout] = useState(null);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        myProducts: false,
        isIdea: false,
        isParticipant: false,
        isClassified: false
    });

  const user = useContext(UserContext);

    const getProducts = () => {
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
            .catch(err => console.log(err.message));
    };

    useEffect(() => {
        debounce(search, getProducts);
    }, [search]);

    useEffect(getProducts, [filters, user.userGroup]);

  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
  };

    const debounce = (text, callback) => {
        if (cancelTimeout) {
            clearTimeout(cancelTimeout);
            setCancelTimeout(null);
        }
        const t = setTimeout(callback, 250);
        setCancelTimeout(t);
    };

    return (
        <div className={classes.root}>
            <div className={classes.searchField}>
                <SearchField onSearch={e => setSearch(e.target.value)} />
            </div>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Filters</FormLabel>
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
                            label="Created by me"
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
                            label="Participant"
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
                        label="Idea"
                    />
                </FormGroup>
            </FormControl>
            {user.userGroup ? (
                <FormControl
                    component="fieldset"
                    className={classes.formControl}
                >
                    <FormLabel component="legend">Warning</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.isClassified}
                                    color="primary"
                                    onChange={handleFilterChange}
                                    name="isClassified"
                                />
                            }
                            label="Include classified products"
                        />
                    </FormGroup>
                </FormControl>
            ) : null}
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
