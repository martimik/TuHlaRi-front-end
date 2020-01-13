import React from "react";
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

export default function Product(props) {
    const classes = useStyles();
    if (props.product) {
        return (
            <div className="product">
                {props.product.isClassified ? (
                    <SecurityIcon color="primary" fontSize="large" />
                ) : null}
                {props.toggleEditMode ? (
                    <Fab
                        color="secondary"
                        aria-label="edit"
                        size="small"
                        style={{ float: "right" }}
                        onClick={props.toggleEditMode}
                    >
                        <EditIcon />
                    </Fab>
                ) : null}
                <div className="product-header">
                    <h1>{props.product.productName}</h1>
                    <img
                        className="logo-large"
                        src={
                            props.product.logos[
                                props.product.logos.length - 1
                            ] ||
                            "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
                        }
                        alt={props.product.productName}
                    ></img>
                </div>
                <Stepper
                    alternativeLabel
                    activeStep={props.product.lifecycleStatus - 1}
                >
                    {[
                        "Idea",
                        "Accepted",
                        "Planning",
                        "Developement",
                        "Released",
                        "Production",
                        "Closed"
                    ].map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    <p className="product-short-description">
                        {props.product.shortDescription}
                    </p>
                </div>
                <div>
                    <p className="product-long-description">
                        {props.product.longDescription}
                    </p>

                    <Typography variant="caption">Technologies:</Typography>
                    <div className={classes.chips}>
                        {props.product.technologies.map((technology, i) => (
                            <Chip
                                key={i}
                                label={technology}
                                color="secondary"
                                variant="outlined"
                            />
                        ))}
                    </div>

                    <Divider />

                    <Typography variant="caption">Components:</Typography>
                    <div className={classes.chips}>
                        {props.product.components.map((component, i) => (
                            <Chip
                                key={i}
                                label={component}
                                color="secondary"
                                variant="outlined"
                            />
                        ))}
                    </div>

                    <Divider />
                    <Typography variant="caption">
                        Environment Requirements:
                    </Typography>
                    <div className={classes.chips}>
                        {props.product.environmentRequirements.map(
                            (requirement, i) => (
                                <Chip
                                    key={i}
                                    label={requirement}
                                    color="secondary"
                                    variant="outlined"
                                />
                            )
                        )}
                    </div>
                    <Divider />
                    <Typography variant="caption">Customers:</Typography>
                    <div className={classes.chips}>
                        {props.product.customers.map((customer, i) => (
                            <Chip
                                key={i}
                                label={customer}
                                color="secondary"
                                variant="outlined"
                            />
                        ))}
                    </div>
                    <Divider />

                    <p className="product-lifecycle">
                        {props.product.lifecycle || null}
                    </p>
                    <p className="product-business-owner">
                        {props.product.businessOwner || null}
                    </p>
                    <div className={classes.bottomChipGroup}>
                        {props.product.pricing ? (
                            <div>
                                <Typography variant="caption">
                                    Pricing:
                                </Typography>
                                <div>
                                    <Chip
                                        color="primary"
                                        label={props.product.pricing}
                                        avatar={<Avatar>€</Avatar>}
                                    />
                                </div>
                            </div>
                        ) : null}
                        {props.product.productOwner ? (
                            <div>
                                <Typography variant="caption">
                                    Product Owner:
                                </Typography>
                                <div>
                                    <Chip
                                        variant="outlined"
                                        color="primary"
                                        label={props.product.productOwner}
                                        icon={<PermIdentityIcon />}
                                    />
                                </div>
                            </div>
                        ) : null}
                        {props.product.salesPerson ? (
                            <div>
                                <Typography variant="caption">
                                    Sales Person:
                                </Typography>
                                <div>
                                    <Chip
                                        variant="outlined"
                                        color="primary"
                                        label={props.product.salesPerson}
                                        icon={<PermIdentityIcon />}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <p>Please select an item</p>
            </div>
        );
    }
}
const useStyles = makeStyles(theme => ({
    chips: {
        "& > *": {
            margin: theme.spacing(0.6)
        }
    },
    bottomChipGroup: {
        display: "flex",
        justifyContent: "space-evenly"
    }
}));
