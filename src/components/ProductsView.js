import React, { useState, useEffect, useContext, useRef } from "react";
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
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

axios.defaults.withCredentials = true;

export default function ProductsView() {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [cancelTimeout, setCancelTimeout] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({
        myProducts: false,
        isParticipant: false,
        isClassified: false,
        lifecycleStatus: 0
    });

    const [isLoading, setIsLoading] = useState(false);
    const user = useContext(UserContext);

    const lifecycleStatuses = [
        "All",
        "Idea",
        "Accepted",
        "Planning",
        "Development",
        "Released",
        "Production",
        "Closed"
    ];

    const getProducts = () => {
        setIsLoading(true);
        axios
            .get(API_URL + "products", {
                params: {
                    filters,
                    search,
                    page
                }
            })
            .then(response => {
                setProducts(response.data);
            })
            .catch(err => console.log(err.message))
            .finally(() => setIsLoading(false));
    };

    const debounce = callback => {
        if (cancelTimeout) {
            clearTimeout(cancelTimeout);
            setCancelTimeout(null);
        }
        const t = setTimeout(callback, 250);
        setCancelTimeout(t);
    };

    useEffect(() => {
        const onScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight
            ) {
                setPage(state => state + 1);
            }
        };
        document.addEventListener("scroll", onScroll);
        return () => document.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        getProducts();
    }, [filters, user.userGroup]);

    useEffect(() => {
        debounce(getProducts);
    }, [search]);

    const handleFilterChange = e => {
        setFilters({ ...filters, [e.target.name]: e.target.checked });
    };

    const handlelifecycleStatus = e => {
        setFilters({ ...filters, lifecycleStatus: e.target.value });
    };

    return (
        <div className={classes.root}>
            <div className={classes.searchField}>
                <SearchField onSearch={e => setSearch(e.target.value)} />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Status
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="lifecycle-status-select"
                        onChange={handlelifecycleStatus}
                        value={filters.lifecycleStatus}
                    >
                        {lifecycleStatuses.map((status, i) => (
                            <MenuItem value={i}>{status}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            {user.userGroup && (
                <React.Fragment>
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        <FormLabel component="legend">Filters</FormLabel>
                        <FormGroup>
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
                        </FormGroup>
                    </FormControl>
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
                </React.Fragment>
            )}
            <Grid container spacing={3}>
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </Grid>
            <Backdrop
                transitionDuration={500}
                className={classes.backdrop}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
        width: 450,
        display: "flex",
        alignItems: "center"
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 120
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
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff"
    }
}));
