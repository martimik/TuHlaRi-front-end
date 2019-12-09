import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Image from "material-ui-image";
import { isBlockParent } from "@babel/types";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function CreateProduct() {
    const classes = useStyles();
    const [input, setInput] = useState({
        name: "",
        shortDescription: "",
        longDescription: "",
        customer: "",
        pricing: "",
        technology: "",
        component: "",
        environmentRequirement: "",
        salesPerson: "",
        productOwner: "",
        businessType: "",
        logo: ""
    });

    const [components, setComponents] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [environmentRequirements, setEnvironmentRequirements] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [image, setImage] = useState(null);
    const [imageIshidden, setImageIsHidden] = useState(true);

    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    }

    function addComponent(component) {
        if (!component) return;
        setComponents([...components, component]);
        setInput({ ...input, component: "" });
    }

    function addTechnology(technology) {
        if (!technology) return;
        setTechnologies([...technologies, technology]);
        setInput({ ...input, technology: "" });
    }

    function addCustomer(customer) {
        if (!customer) return;
        setCustomers([...customers, customer]);
        setInput({ ...input, customer: "" });
    }

    function addEnvironmentRequirement(environmentRequirement) {
        if (!environmentRequirement) return;
        setEnvironmentRequirements([
            ...environmentRequirements,
            environmentRequirement
        ]);
        setInput({ ...input, environmentRequirement: "" });
    }

    function deleteComponent(index) {
        setComponents(components.filter((component, i) => index !== i));
    }

    function deleteTechnology(index) {
        setTechnologies(technologies.filter((technology, i) => index !== i));
    }

    function deleteCustomer(index) {
        setCustomers(customers.filter((customer, i) => index !== i));
    }

    function deleteEnvironmentRequirement(index) {
        setEnvironmentRequirements(
            environmentRequirements.filter(
                (environmentRequirement, i) => index !== i
            )
        );
    }

    function onUpload(event) {
        setImageIsHidden(!imageIshidden);
        console.log(event);

        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = e => setImage(e.target.result);

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    function removeImage() {
        setImageIsHidden(!imageIshidden);
        setImage(null);
    }

    function submitProduct(event) {
        event.preventDefault();
        const product = input;
        product.technologies = technologies;
        product.components = components;
        product.customers = customers;
        product.environmentRequirements = environmentRequirements;
        delete product.technology;
        delete product.component;
        delete product.environmentRequirement;
        delete product.customer;

        console.log(product);
        // lähetä
    }

    function readKey(event) {
        if (event.key === "Enter") {
            const {
                component,
                technology,
                environmentRequirement,
                customer
            } = input;

            switch (event.target.name) {
                case "component":
                    addComponent(component);
                    break;
                case "technology":
                    addTechnology(technology);
                    break;
                case "environmentRequirement":
                    addEnvironmentRequirement(environmentRequirement);
                    break;
                case "customer":
                    addCustomer(customer);
                    break;
                default:
                    console.log("Default case");
            }
        }

        if (event.key === "Backspace" && !event.target.value) {
            switch (event.target.name) {
                case "component":
                    deleteComponent(components.length - 1);
                    break;
                case "technology":
                    deleteTechnology(technologies.length - 1);
                    break;
                case "environmentRequirement":
                    deleteEnvironmentRequirement(
                        environmentRequirements.length - 1
                    );
                    break;
                case "customer":
                    deleteCustomer(customers.length - 1);
                    break;
                default:
                    console.log("Default case");
            }
        }
    }

    return (
        <div className={classes.root}>
            <h1 className="create-product-header">Add new product</h1>
            <form
                className={classes.form}
                noValidate
                autoComplete="off"
                onSubmit={submitProduct}
            >
                <Grid
                    container
                    direction="row"
                    alignItems="flex-start"
                    spacing={2}
                    style={{ marginTop: "15px" }}
                >
                    <Grid
                        item
                        xs={6}
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item xs={11} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    value={input.name}
                                    name="name"
                                    label="Name"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={11} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    multiline
                                    name="shortDescription"
                                    label="Short description"
                                    value={input.pricing}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={11} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    name="businessType"
                                    label="Business type"
                                    value={input.shortDescription}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={11} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    value={input.name}
                                    name="salesPerson"
                                    label="Sales person"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={11} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    name="productOwner"
                                    label="Product owner"
                                    value={input.pricing}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={11} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    multiline
                                    name="pricing"
                                    label="Pricing"
                                    value={input.shortDescription}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={12}
                            justify="center"
                            alignItems="baseline"
                            style={{ margin: "40px 0px 20px 0px" }}
                        >
                            <FormControlLabel
                                control={<Switch />}
                                label="Is an idea"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                control={<Switch />}
                                label="Is classified"
                                labelPlacement="start"
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.imageField}>
                            <h2 className="create-product-header">
                                Logo
                                <IconButton
                                    aria-label="delete"
                                    onClick={removeImage}
                                    className={
                                        imageIshidden
                                            ? classes.imgHidden
                                            : classes.removeButton
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </h2>

                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={onUpload}
                            />
                            <label
                                htmlFor="contained-button-file"
                                className={
                                    imageIshidden
                                        ? classes.imgVisible
                                        : classes.imgHidden
                                }
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                    startIcon={<AddAPhoto />}
                                >
                                    Upload
                                </Button>
                            </label>
                            <img
                                className={
                                    imageIshidden
                                        ? classes.imgHidden
                                        : classes.imgVisible
                                }
                                src={image}
                                alt=""
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid>
                    <FormControl fullWidth>
                        <TextField
                            multiline
                            onChange={handleChange}
                            name="longDescription"
                            label="Long description"
                            value={input.longDescription}
                        />
                    </FormControl>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={6} className={classes.inputfield2}>
                        <div>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    name="technology"
                                    label="Technologies"
                                    onKeyDown={readKey}
                                    value={input.technology}
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={classes.inputfield2}>
                        <div>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    name="component"
                                    label="Components"
                                    onKeyDown={readKey}
                                    value={input.component}
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{ padding: "0" }}>
                        <div className={classes.chipContainer}>
                            {technologies.map((technology, i) => (
                                <Chip
                                    key={i}
                                    label={technology}
                                    onDelete={() => deleteTechnology(i)}
                                    className={classes.chip}
                                />
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.chipContainer}>
                            {components.map((component, i) => (
                                <Chip
                                    key={i}
                                    label={component}
                                    onDelete={() => deleteComponent(i)}
                                    className={classes.chip}
                                />
                            ))}
                        </div>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={6} className={classes.inputfield2}>
                        <div>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    name="environmentRequirement"
                                    label="Environment Requirement"
                                    onKeyDown={readKey}
                                    value={input.environmentRequirement}
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={classes.inputfield2}>
                        <div>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    name="customer"
                                    label="Customer"
                                    onKeyDown={readKey}
                                    value={input.customer}
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{ padding: "0" }}>
                        <div className={classes.chipContainer}>
                            {environmentRequirements.map(
                                (environmentRequirement, i) => (
                                    <Chip
                                        key={i}
                                        label={environmentRequirement}
                                        onDelete={() =>
                                            deleteEnvironmentRequirement(i)
                                        }
                                        className={classes.chip}
                                    />
                                )
                            )}
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.chipContainer}>
                            {customers.map((customer, i) => (
                                <Chip
                                    key={i}
                                    label={customer}
                                    onDelete={() => deleteCustomer(i)}
                                    className={classes.chip}
                                />
                            ))}
                        </div>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    type="submit"
                    style={{ marginTop: "20px" }}
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: "70%",
        margin: "60px auto",
        boxShadow: "1px 2px 20px 1px#d4d4d4",
        padding: "30px",
        borderRadius: "25px",
        backgroundColor: "white"
    },
    form: {},
    chip: {
        margin: theme.spacing(0.5)
    },
    chipContainer: {
        minHeight: "25px"
    },
    flex: {
        display: "flex",
        justifyContent: "space-around"
    },
    input: {
        display: "none"
    },
    imgVisible: {
        maxHeight: "200px",
        maxWidth: "100%",
        margin: "auto"
    },
    imgHidden: {
        visibility: "Collapse",
        position: "absolute"
    },
    inputField: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    inputfield2: {
        marginTop: "15px",
        marginBottom: "0 px"
    },
    imageField: {},
    removeButton: {
        position: "absolute",
        right: "0px",
        padding: "0",
        marginTop: "4px"
    }
}));
