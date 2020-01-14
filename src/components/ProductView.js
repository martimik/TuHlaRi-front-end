import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

export default function ProductsView(props) {
    const classes = useStyles();
    const { product } = props;

    return (
        <Grid item xs>
            <Card className={classes.card}>
                <CardActionArea>
                    <Link to={"product/" + product._id}>
                        <CardMedia
                            className={classes.media}
                            image={product.logos[product.logos.length - 1]}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                {product.productName}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                                className={classes.shortDescription}
                            >
                                {product.shortDescription}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

const useStyles = makeStyles(theme => ({
    card: {
        textAlign: "center",
        color: theme.palette.text.secondary,
        maxWidth: 300,
        minWidth: 200
    },
    media: {
        height: 140
    },
    shortDescription: {
        minHeight: 62
    }
}));
