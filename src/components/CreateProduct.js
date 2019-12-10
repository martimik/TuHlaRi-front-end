import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import AddAPhoto from "@material-ui/icons/AddAPhoto";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import axios from "axios";

export default function CreateProduct() {
    const classes = useStyles();
    const [input, setInput] = useState({
        productName: "",
        shortDescription: "",
        longDescription: "",
        pricing: "",
        salesPerson: "",
        productOwner: "",
        businessType: "",
        lifecycleStatus: "",
        technology: "",
        component: "",
        environmentRequirement: "",
        customer: ""
    });

    const [isIdea, setIsIdea] = useState(false);
    const [isClassified, setIsClassified] = useState(false);
    const [components, setComponents] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [environmentRequirements, setEnvironmentRequirements] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState();
    const [imageIshidden, setImageIsHidden] = useState(true);

    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    }

    function handleIdeaSwitch(event) {
        setIsIdea(!isIdea);
    }

    function handleClassifiedSwitch(event) {
        setIsClassified(!isClassified);
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
        // console.log(event);

        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            setImageFile(event.target.files[0]);
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
        product.isIdea = isIdea;
        product.isClassified = isClassified;
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

        const formData = new FormData();
        formData.append("image", imageFile, imageFile.filename);

        axios
            .post("http://10.99.104.41:8080/uploadImage", formData)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    product.logo = "http://10.99.104.41:8080/" + response.data;
                    axios
                        .post("http://10.99.104.41:8080/addProduct", product)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    function disableSubmitOnEnter(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    }

    function readKey(event) {
        if (event.key === "Enter") {
            event.preventDefault();
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
                    <Grid item xs={6}>
                        <Grid item xs={11} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    onKeyDown={disableSubmitOnEnter}
                                    value={input.name}
                                    name="productName"
                                    label="Name"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={11} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    onKeyDown={disableSubmitOnEnter}
                                    multiline
                                    name="shortDescription"
                                    label="Short description"
                                    value={input.shortDescription}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={11} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    onKeyDown={disableSubmitOnEnter}
                                    name="businessType"
                                    label="Business type"
                                    value={input.businessType}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={11} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    onKeyDown={disableSubmitOnEnter}
                                    value={input.salesPerson}
                                    name="salesPerson"
                                    label="Sales person"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={11} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    onKeyDown={disableSubmitOnEnter}
                                    name="productOwner"
                                    label="Product owner"
                                    value={input.productOwner}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="row"
                            justify="space-evenly"
                            style={{ margin: "40px 0px 20px 0px" }}
                        >
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isIdea}
                                        onChange={handleIdeaSwitch}
                                    />
                                }
                                name="idea"
                                label="Is an idea"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isClassified}
                                        onChange={handleClassifiedSwitch}
                                    />
                                }
                                name="classified"
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
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={6} className={classes.inputfield}>
                        <FormControl fullWidth>
                            <TextField
                                onChange={handleChange}
                                onKeyDown={disableSubmitOnEnter}
                                name="pricing"
                                label="Pricing"
                                value={input.pricing}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.inputfield}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="demo-customized-select-native">
                                Lifecycle status
                            </InputLabel>
                            <Select
                                id="demo-customized-select-native"
                                name="lifecycleStatus"
                                value={input.lifecycleStatus}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>(1) Idea</MenuItem>
                                <MenuItem value={2}>(2) In innovation</MenuItem>
                                <MenuItem value={3}>(3) Accepted idea</MenuItem>
                                <MenuItem value={4}>(4) Planning</MenuItem>
                                <MenuItem value={5}>
                                    (5) In developement
                                </MenuItem>
                                <MenuItem value={6}>(6) Release</MenuItem>
                                <MenuItem value={7}>(7) In production</MenuItem>
                                <MenuItem value={8}>(8) In support</MenuItem>
                                <MenuItem value={9}>
                                    (9) Maintenance mode
                                </MenuItem>
                                <MenuItem value={10}>(10) Ended</MenuItem>
                            </Select>
                        </FormControl>
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
                <Grid item className={classes.inputfield2}>
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
                <Button
                    variant="contained"
                    type="submit"
                    style={{ marginTop: "30px" }}
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
        maxHeight: "180px",
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