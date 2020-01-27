import React, { useState, useEffect } from "react";
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
import { useSnackbar } from "notistack";
import API_URL from "../js/api";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ProductEditor(props) {
    const classes = useStyles();

    const [isIdea, setIsIdea] = useState(false);
    const [isClassified, setIsClassified] = useState(false);
    const [components, setComponents] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [environmentRequirements, setEnvironmentRequirements] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState();
    const [imageIshidden, setImageIsHidden] = useState(true);
    const [users, setUsers] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const emptyInput = {
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
        customer: "",
        participant: ""
    };
    const [input, setInput] = useState(emptyInput);

    useEffect(() => {
        if (props.product) {
            setInput({
                productName: props.product.productName,
                shortDescription: props.product.shortDescription,
                longDescription: props.product.longDescription,
                pricing: props.product.pricing,
                salesPerson: props.product.salesPerson,
                productOwner: props.product.productOwner,
                businessType: props.product.businessType,
                lifecycleStatus: props.product.lifecycleStatus
            });
            setTechnologies(props.product.technologies);
            setComponents(props.product.components);
            setEnvironmentRequirements(props.product.environmentRequirements);
            setCustomers(props.product.customers);
            setIsClassified(props.product.isClassified);
            setParticipants(props.product.participants);
            if (props.product.logos.length) {
                setImage(props.product.logos[props.product.logos.length - 1]);
                setImageIsHidden(false);
            }
        }
    }, [props]);

    useEffect(() => {
        axios
            .get(API_URL + "users")
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    }

    const handleAutoCompleteChange = name => e => {
        if (!e) return;
        setInput({
            ...input,
            [name]: e.target.value || e.target.innerText || ""
        });
    };

    function handleLifecycleStatus(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });

        if (event.target.value === 1) {
            setIsIdea(true);
        } else {
            setIsIdea(false);
        }
    }

    function handleClassifiedSwitch() {
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

    function addParticipant(participant) {
        if (!participant) return;
        setParticipants([...participants, participant]);
        setInput({ ...input, participant: "" });
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

    function deleteParticipant(index) {
        setParticipants(participants.filter((participant, i) => index !== i));
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

    function validateSubmit() {
        if (
            isIdea &&
            input.productName.length > 3 &&
            input.shortDescription.length > 3
        )
            return true;
        else if (
            input.productName.length > 3 &&
            input.shortDescription.length > 3 &&
            input.productOwner.length > 3
        )
            return true;
        return false;
    }

    function submitProduct(event) {
        event.preventDefault();

        if (!validateSubmit()) {
            enqueueSnackbar("Required fields not filled!", {
                variant: "warning",
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                }
            });
        } else {
            if (imageFile) {
                uploadImage(); // Upload image will handle product upload
            } else {
                uploadProduct();
            }
        }
    }

    function uploadImage() {
        const formData = new FormData();
        formData.append("image", imageFile, imageFile.filename);

        axios
            .post(API_URL + "uploadImage", formData)
            .then(response => {
                if (response.status === 200) {
                    uploadProduct(API_URL + response.data);
                }
            })
            .catch(error => {
                console.error(error);
                enqueueSnackbar("Image upload failed.", {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right"
                    }
                });
            });
    }

    function uploadProduct(imageURL) {
        const id = props.product ? props.product._id : null;
        const product = input;
        product.isIdea = isIdea;
        product.isClassified = isClassified;
        product.technologies = technologies;
        product.components = components;
        product.customers = customers;
        product.participants = participants;
        product.environmentRequirements = environmentRequirements;
        product.logo = imageURL || "";
        product.id = id ? id : null;
        delete product.technology;
        delete product.component;
        delete product.environmentRequirement;
        delete product.customer;
        delete product.participant;

        axios
            .post(API_URL + (id ? "editProduct" : "addProduct"), product)
            .then(response => {
                enqueueSnackbar(id ? "Product edited" : "Product added", {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right"
                    }
                });
                if (!props.toggleEditMode) {
                    clearInput();
                } else {
                    props.onEdit();
                }
            })
            .catch(error => {
                console.log(error.response);
                enqueueSnackbar(error.response.data.message, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right"
                    }
                });
            });
    }

    function clearInput() {
        setIsIdea(false);
        setIsClassified(false);
        setInput(emptyInput);
        setImage(null);
        setImageIsHidden(true);
        setImageFile(null);
        setTechnologies([]);
        setComponents([]);
        setEnvironmentRequirements([]);
        setCustomers([]);
        setParticipants([]);
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
                customer,
                participant
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
                case "participant":
                    addParticipant(participant);
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
                case "participant":
                    deleteParticipant(participants.length - 1);
                    break;
                default:
                    console.log("Default case");
            }
        }
    }

    return (
        <Paper elevation={2} className={classes.root}>
            <div className={classes.actionButtons}>
                {props.onDelete && (
                    <Fab
                        color="secondary"
                        aria-label="edit"
                        size="small"
                        onClick={props.onDelete}
                    >
                        <DeleteForeverIcon />
                    </Fab>
                )}
                {props.toggleEditMode && (
                    <Fab
                        color="secondary"
                        aria-label="edit"
                        size="small"
                        onClick={props.toggleEditMode}
                    >
                        <EditIcon />
                    </Fab>
                )}
            </div>
            <h1 className="create-product-header">{props.title}</h1>
            <form
                className={classes.form}
                noValidate
                autoComplete="off"
                onSubmit={submitProduct}
            >
                <Grid container direction="column" spacing={1}>
                    <Grid item xs={12} className={classes.inputField}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isClassified}
                                    onChange={handleClassifiedSwitch}
                                    value="isClassified"
                                />
                            }
                            name="classified"
                            label="Is classified"
                            labelPlacement="start"
                        />
                    </Grid>
                    <Grid item xs={10} className={classes.inputField}>
                        <TextField
                            onChange={handleChange}
                            onKeyDown={disableSubmitOnEnter}
                            value={input.productName}
                            name="productName"
                            label="Name"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={10} className={classes.inputField}>
                        <TextField
                            onChange={handleChange}
                            onKeyDown={disableSubmitOnEnter}
                            multiline
                            name="shortDescription"
                            label="Short description"
                            value={input.shortDescription}
                            required
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={10} className={classes.inputField}>
                        <FormControl fullWidth>
                            <InputLabel
                                htmlFor="demo-customized-select-native"
                                required
                            >
                                Lifecycle status
                            </InputLabel>
                            <Select
                                id="demo-customized-select-native"
                                name="lifecycleStatus"
                                value={input.lifecycleStatus}
                                onChange={handleLifecycleStatus}
                            >
                                <MenuItem value={1}>(1) Idea</MenuItem>
                                <MenuItem value={2}>(2) Accepted idea</MenuItem>
                                <MenuItem value={3}>(3) Planning</MenuItem>
                                <MenuItem value={4}>
                                    (4) In developement
                                </MenuItem>
                                <MenuItem value={5}>(5) Released</MenuItem>
                                <MenuItem value={6}>(6) In production</MenuItem>
                                <MenuItem value={7}>(7) Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={10} className={classes.inputField}>
                        <TextField
                            multiline
                            onChange={handleChange}
                            name="longDescription"
                            label="Long description"
                            value={input.longDescription}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={10} className={classes.inputField}>
                        <Autocomplete
                            onInputChange={handleAutoCompleteChange(
                                "productOwner"
                            )}
                            options={users}
                            getOptionLabel={user => user.email}
                            freeSolo
                            autoSelect
                            autoComplete
                            inputValue={input.productOwner}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Product owner"
                                    required={!isIdea}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={10} className={classes.inputField}>
                        <Autocomplete
                            onInputChange={handleAutoCompleteChange(
                                "salesPerson"
                            )}
                            options={users}
                            getOptionLabel={user => user.email}
                            inputValue={input.salesPerson}
                            freeSolo
                            autoSelect
                            autoComplete
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Sales person"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={10} className={classes.inputField}>
                        <TextField
                            onChange={handleChange}
                            onKeyDown={disableSubmitOnEnter}
                            name="businessType"
                            label="Business type"
                            value={input.businessType}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={10} className={classes.inputField}>
                        <TextField
                            onChange={handleChange}
                            onKeyDown={disableSubmitOnEnter}
                            name="pricing"
                            label="Pricing (€)"
                            value={input.pricing}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={10} className={classes.inputField}>
                        <div>
                            <TextField
                                onChange={handleChange}
                                name="technology"
                                label="Technologies"
                                onKeyDown={readKey}
                                value={input.technology}
                                fullWidth
                            />
                        </div>
                    </Grid>
                    <Grid item xs={10} style={{ padding: "0" }}>
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
                    <Grid item xs={10} className={classes.inputField}>
                        <div>
                            <TextField
                                onChange={handleChange}
                                name="component"
                                label="Components"
                                onKeyDown={readKey}
                                value={input.component}
                                fullWidth
                            />
                        </div>
                    </Grid>
                    <Grid item xs={10}>
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
                    <Grid item xs={10} className={classes.inputField}>
                        <div>
                            <TextField
                                onChange={handleChange}
                                name="environmentRequirement"
                                label="Environment Requirement"
                                onKeyDown={readKey}
                                value={input.environmentRequirement}
                                fullWidth
                            />
                        </div>
                    </Grid>
                    <Grid item xs={10} style={{ padding: "0" }}>
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
                    <Grid item xs={10} className={classes.inputField}>
                        <div>
                            <TextField
                                onChange={handleChange}
                                name="customer"
                                label="Customers"
                                onKeyDown={readKey}
                                value={input.customer}
                                fullWidth
                            />
                        </div>
                    </Grid>
                    <Grid item xs={10}>
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
                    <Grid item xs={10} className={classes.inputField}>
                        <div>
                            <TextField
                                onChange={handleChange}
                                name="participant"
                                label="Participants"
                                onKeyDown={readKey}
                                value={input.participant}
                                fullWidth
                            />
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <div className={classes.chipContainer}>
                            {participants.map((participant, i) => (
                                <Chip
                                    key={i}
                                    label={participant}
                                    onDelete={() => deleteParticipant(i)}
                                    className={classes.chip}
                                />
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <h2 className={classes.logoText}>
                            Logo
                            {image && (
                                <IconButton
                                    aria-label="delete"
                                    onClick={removeImage}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </h2>

                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={onUpload}
                        />
                        {!image && (
                            <label htmlFor="contained-button-file">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                    startIcon={<AddAPhoto />}
                                >
                                    Upload
                                </Button>
                            </label>
                        )}
                        {image && (
                            <img
                                className={classes.img}
                                src={image}
                                alt="product logo"
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ margin: "20px" }}>
                    <Button
                        variant="contained"
                        type="submit"
                        style={{ marginTop: "30px" }}
                    >
                        Submit
                    </Button>
                </Grid>
            </form>
        </Paper>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 1000,
        padding: theme.spacing(4),
        margin: "auto"
    },
    actionButtons: {
        float: "right",
        "& > *": {
            marginLeft: theme.spacing(1)
        }
    },
    chip: {
        margin: theme.spacing(0.5)
    },
    chipContainer: {
        minHeight: "40px"
    },
    flex: {
        display: "flex",
        justifyContent: "space-around"
    },
    input: {
        display: "none"
    },
    logoText: {
        position: "relative",
        fontFamily: "Roboto",
        fontWeight: 300,
        fontStyle: "italic",
        margin: "10px"
    },
    img: {
        maxHeight: "180px",
        maxWidth: "100%",
        margin: "auto"
    },
    imgHidden: {
        visibility: "collapse",
        position: "absolute"
    },
    inputField: {
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "10%",
        marginRight: "10%"
    },
    removeButton: {
        position: "absolute",
        right: "0px",
        padding: "0",
        marginTop: "4px"
    }
}));
