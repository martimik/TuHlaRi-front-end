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

export default function CreateProduct() {
    const classes = useStyles();
    const [input, setInput] = useState({
        name: "",
        shortDescription: "",
        longDescription: "",
        customer: "",
        pricing: "",
        technology: "",
        component: ""
    });

    const [components, setComponents] = useState([]);
    const [technologies, setTechnologies] = useState([]);
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

    function deleteComponent(index) {
        setComponents(components.filter((component, i) => index !== i));
    }

    function deleteTechnology(index) {
        setTechnologies(technologies.filter((technology, i) => index !== i));
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

    function submitProduct(event) {
        event.preventDefault();
        const product = input;
        product.technologies = technologies;
        product.components = components;
        delete product.technology;
        delete product.component;

        console.log(product);
        // lähetä
    }

    function readKey(event) {
        if (event.key === "Enter") {
            const { component, technology } = input;

            switch (event.target.name) {
                case "component":
                    addComponent(component);
                    break;
                case "technology":
                    addTechnology(technology);
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
                    alignItems="center"
                    spacing={2}
                    style={{ marginTop: "15px" }}
                >
                    <Grid
                        item
                        xs={8}
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item xs={10} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    value={input.name}
                                    name="name"
                                    label="Name"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={10} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    name="customer"
                                    label="Customer"
                                    value={input.customer}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={10} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    name="pricing"
                                    label="Pricing"
                                    value={input.pricing}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={10} className={classes.inputField}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    multiline
                                    name="shortDescription"
                                    label="Short description"
                                    value={input.shortDescription}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} className={classes.imageField}>
                        <div className="upload-btn-wrapper">
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
                        </div>
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
                    <Grid item xs={6}>
                        <div className={classes.chipContainer}>
                            <FormControl fullWidth>
                                <TextField
                                    onChange={handleChange}
                                    name="technology"
                                    label="Technology"
                                    onKeyDown={readKey}
                                    value={input.technology}
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.chipContainer}>
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
                    <Grid item xs={6}>
                        <div>
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
                        <div>
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
        margin: "60px auto 60px auto",
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
        display: "flex",
        flexDirection: "column",
        marginTop: "15px"
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
        maxWidth: "200px"
    },
    imgHidden: {
        visibility: "Collapse"
    },
    inputField: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    imageField: {
        marginTop: "15px",
        marginBottom: "0 px"
    }
}));
