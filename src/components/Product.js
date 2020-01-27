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
import Dialog from "./Dialog";
import BarChartIcon from "@material-ui/icons/BarChart";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

export default function Product(props) {
<<<<<<< HEAD
  const classes = useStyles();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const lifecycleStatuses = [
    "Idea",
    "Accepted",
    "Planning",
    "Developement",
    "Released",
    "Production",
    "Closed"
  ];

  useEffect(() => {
    if (id) {
      axios
        .get(API_URL + "product/" + id)
        .then(res => setProduct(res.data))
        .catch(err => console.log(err));
=======
    const classes = useStyles();
    const [product, setProduct] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { id } = useParams();
    const lifecycleStatuses = [
        "Idea",
        "Accepted",
        "Planning",
        "Developement",
        "Released",
        "Production",
        "Closed"
    ];

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

    if (product) {
        return (
            <div className={props.className}>
                <Paper elevation={2} className={classes.paper}>
                    {product.isClassified && (
                        <SecurityIcon color="primary" fontSize="large" />
                    )}
                    {props.toggleEditMode && (
                        <Fab
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
                                "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
                            }
                            alt={product.productName}
                        />
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
                        disabled={!Boolean(graphData)}
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <BarChartIcon />
                        Check time usage
                    </Fab>
                    <div>
                        <p className="product-short-description">
                            {product.shortDescription}
                        </p>
                    </div>
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
                                                variant="outlined"
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
                                            variant="outlined"
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
                                                variant="outlined"
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
                                            color="secondary"
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
                                <Bar dataKey="Hours" fill="#8884d8" />
                            </BarChart>
                        </div>
                    )}
                </Dialog>
            </div>
        );
>>>>>>> 4e7a47453c053f58b9d904621c8b8e0e020d1101
    }
  }, [id]);

  if (product) {
    return (
      <div className={props.className}>
        <Paper elevation={2} className={classes.paper}>
          {product.isClassified ? (
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
            <h1>{product.productName}</h1>
            <img
              className="logo-large"
              src={
                product.logos[product.logos.length - 1] ||
                "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
              }
              alt={product.productName}
            ></img>
          </div>
          <Stepper alternativeLabel activeStep={product.lifecycleStatus - 1}>
            {lifecycleStatuses.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            <p className="product-short-description">
              {product.shortDescription}
            </p>
          </div>
          <div className={classes.content}>
            <p className="product-long-description">
              {product.longDescription}
            </p>
            {product.technologies.length ? (
              <div>
                <Divider />
                <Typography variant="caption">Technologies:</Typography>
                <div className={classes.chips}>
                  {product.technologies.map((technology, i) => (
                    <Chip
                      key={i}
                      label={technology}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </div>
              </div>
            ) : null}
            {product.components.length ? (
              <div>
                <Divider />
                <Typography variant="caption">Components:</Typography>
                <div className={classes.chips}>
                  {product.components.map((component, i) => (
                    <Chip
                      key={i}
                      label={component}
                      color="secondary"
                      variant="outlined"
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
                  {product.environmentRequirements.map((requirement, i) => (
                    <Chip
                      key={i}
                      label={requirement}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </div>
              </div>
            ) : null}
            {product.customers.length ? (
              <div>
                <Divider />
                <Typography variant="caption">Customers:</Typography>
                <div className={classes.chips}>
                  {product.customers.map((customer, i) => (
                    <Chip
                      key={i}
                      label={customer}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </div>
              </div>
            ) : null}
            {product.participants.length ? (
              <div>
                <Divider />
                <Typography variant="caption">Participants:</Typography>
                <div className={classes.chips}>
                  {product.participants.map((participant, i) => (
                    <Chip
                      key={i}
                      label={participant}
                      icon={<PermIdentityIcon />}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </div>
              </div>
            ) : null}
            <Divider />
            <div className={classes.bottomChipGroup}>
              {product.pricing ? (
                <div>
                  <Typography variant="caption">Pricing:</Typography>
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
                  <Typography variant="caption">Product Owner:</Typography>
                  <div>
                    <Chip
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
                  <Typography variant="caption">Sales Person:</Typography>
                  <div>
                    <Chip
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
