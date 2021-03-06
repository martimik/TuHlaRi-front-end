import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SecurityIcon from "@material-ui/icons/Security";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import API_URL from "../js/api";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Dialog from "./Dialog";
import BarChartIcon from "@material-ui/icons/BarChart";
import { useSnackbar } from "notistack";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const lifecycleStatuses = [
    "Idea",
    "Accepted",
    "Planning",
    "Developement",
    "Released",
    "Production",
    "Closed"
];

export default function Product(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [product, setProduct] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios
                .get(API_URL + "product/" + id)
                .then(res => {
                    if (res.data.statusChanges) {
                        const statuses = res.data.statusChanges.map(status => ({
                            Hours: (
                                ((status.endedAt || Date.now()) -
                                    status.startedAt) /
                                1000 /
                                60 /
                                60
                            ).toFixed(2),
                            status: lifecycleStatuses[status.statusCode - 1]
                        }));
                        setGraphData(statuses);
                    }
                    setProduct(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [id]);

    const copyText = text => () => {
        try {
            navigator.clipboard.writeText(text);
            enqueueSnackbar(text + " copied to clipboard", {
                variant: "success",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                }
            });
        } catch (e) {
            console.error(e.message);
        }
    };

    if (product) {
        return (
            <div className={props.className}>
                <Paper elevation={2} className={classes.paper}>
                    {product.isClassified && (
                        <SecurityIcon color="primary" fontSize="large" />
                    )}
                    {props.toggleEditMode && (
                        <Fab
                            id="edit-toggle-button"
                            color="secondary"
                            aria-label="edit"
                            size="small"
                            style={{ float: "right" }}
                            onClick={props.toggleEditMode}
                        >
                            <EditIcon />
                        </Fab>
                    )}
                    <div className="product-header">
                        <h1>{product.productName}</h1>
                        <img
                            className="logo-large"
                            src={
                                product.logos[product.logos.length - 1] ||
                                "/img/placeholder.png"
                            }
                            alt={product.productName}
                        />
                    </div>
                    <div>
                        <p className="product-short-description">
                            {product.shortDescription}
                        </p>
                    </div>
                    <Stepper
                        alternativeLabel
                        activeStep={product.lifecycleStatus - 1}
                    >
                        {lifecycleStatuses.map(label => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <Fab
                        color="primary"
                        variant="extended"
                        size="medium"
                        id="open-statistics-button"
                        disabled={!graphData}
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <BarChartIcon />
                        Statistics
                    </Fab>
                    <div>
                        <p className="product-long-description">
                            {product.longDescription}
                        </p>
                        {product.technologies.length ? (
                            <div>
                                <Divider />
                                <Typography variant="caption">
                                    Technologies:
                                </Typography>
                                <div className={classes.chips}>
                                    {product.technologies.map(
                                        (technology, i) => (
                                            <Chip
                                                key={i}
                                                label={technology}
                                                color="secondary"
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        ) : null}
                        {product.components.length ? (
                            <div>
                                <Divider />
                                <Typography variant="caption">
                                    Components:
                                </Typography>
                                <div className={classes.chips}>
                                    {product.components.map((component, i) => (
                                        <Chip
                                            key={i}
                                            label={component}
                                            color="secondary"
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        {product.environmentRequirements.length ? (
                            <div>
                                <Divider />
                                <Typography variant="caption">
                                    Environment Requirements:
                                </Typography>
                                <div className={classes.chips}>
                                    {product.environmentRequirements.map(
                                        (requirement, i) => (
                                            <Chip
                                                key={i}
                                                label={requirement}
                                                color="secondary"
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        ) : null}
                        {product.customers.length ? (
                            <div>
                                <Divider />
                                <Typography variant="caption">
                                    Customers:
                                </Typography>
                                <div className={classes.chips}>
                                    {product.customers.map((customer, i) => (
                                        <Chip
                                            key={i}
                                            label={customer}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        <Divider />
                        <div className={classes.bottomChipGroup}>
                            {product.pricing ? (
                                <div>
                                    <Typography variant="caption">
                                        Pricing:
                                    </Typography>
                                    <div>
                                        <Chip
                                            color="primary"
                                            label={product.pricing}
                                            avatar={<Avatar>€</Avatar>}
                                        />
                                    </div>
                                </div>
                            ) : null}
                            {product.productOwner ? (
                                <div>
                                    <Typography variant="caption">
                                        Product Owner:
                                    </Typography>
                                    <div>
                                        <Chip
                                            onClick={copyText(
                                                product.productOwner
                                            )}
                                            variant="outlined"
                                            color="primary"
                                            label={product.productOwner}
                                            icon={<PermIdentityIcon />}
                                        />
                                    </div>
                                </div>
                            ) : null}
                            {product.salesPerson ? (
                                <div>
                                    <Typography variant="caption">
                                        Sales Person:
                                    </Typography>
                                    <div>
                                        <Chip
                                            onClick={copyText(
                                                product.salesPerson
                                            )}
                                            variant="outlined"
                                            color="primary"
                                            label={product.salesPerson}
                                            icon={<PermIdentityIcon />}
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </Paper>
                <Dialog
                    title="Graph"
                    isOpen={isDialogOpen}
                    setOpen={setIsDialogOpen}
                >
                    {graphData && (
                        <div style={{ width: "100%" }}>
                            <BarChart
                                width={550}
                                height={300}
                                data={graphData}
                                style={{ margin: "auto" }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="status" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Hours" fill="#4791db" />
                            </BarChart>
                        </div>
                    )}
                </Dialog>
            </div>
        );
    }
    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        maxWidth: 1000,
        padding: theme.spacing(4),
        margin: "auto"
    },
    chips: {
        "& > *": {
            margin: theme.spacing(0.6)
        }
    },
    bottomChipGroup: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    content: {
        "& > *": {
            margin: theme.spacing(1)
        }
    }
}));

Product.propTypes = {
    className: PropTypes.string,
    toggleEditMode: PropTypes.func
};

Product.defaultProps = {
    className: ""
};
