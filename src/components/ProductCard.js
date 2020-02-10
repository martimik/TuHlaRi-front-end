import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProductCard(props) {
    const classes = useStyles();
    const { product } = props;

    const logo = product.logos.length
        ? product.logos[product.logos.length - 1]
        : "";

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <Link to={"/product/" + product._id}>
                    <CardMedia
                        className={classes.media}
                        image={logo ? logo : "/img/placeholder.png"}
                        title="product logo"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {product.productName.length > 20
                                ? product.productName.slice(0, 20) + "..."
                                : product.productName}
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

ProductCard.propTypes = {
    product: PropTypes.object
};

ProductCard.defaultProps = {
    product: {
        _id: "default",
        productName: "default",
        shortDescription: "default",
        logos: [""]
    }
};
