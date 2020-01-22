import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const classes = useStyles();
    const { product } = props;

    return (
        <Grid item xs>
            <Card className={classes.card}>
                <CardActionArea>
                    <Link to={"/product/" + product._id}>
                        <CardMedia
                            className={classes.media}
                            image={
                                product.logos[0]
                                    ? product.logos[product.logos.length - 1]
                                    : "https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-4.jpg"
                            }
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
            </Card>
        </Grid>
    );
}

const useStyles = makeStyles(theme => ({
    card: {
        textAlign: "center",
        color: theme.palette.text.secondary,
        maxWidth: 300,
        minWidth: 200,
        "& a": {
            color: "black"
        }
    },
    media: {
        height: 140
    },
    shortDescription: {
        minHeight: 62
    }
}));
