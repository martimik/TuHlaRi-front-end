import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

function trimString(str) {
  if (str.length > 24) {
    str = str.slice(0, 24) + "...";
  }
  return str;
}

export default function Sidebar(props) {
  const { name, products } = props;
  const classes = useStyles();

  return (
    <div>
      <ExpansionPanel
        className={classes.root}
        defaultExpanded={props.defaultExpanded}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ul className={classes.products}>
            {products.map((product, i) => (
              <li
                key={product._id}
                className={
                  props.selected === product._id
                    ? classes.productSelected
                    : classes.product
                }
                onClick={() => props.setProduct(products[i])}
              >
                <div className={classes.productContainer}>
                  <img
                    className="logo-normal"
                    src={
                      product.logo ||
                      "https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"
                    }
                    alt={product.productName}
                  />
                  <p>{trimString(product.productName)}</p>
                </div>
                <div>
                  <ExpandMoreIcon />
                </div>
              </li>
            ))}
          </ul>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    "& .MuiExpansionPanelDetails-root": {
      padding: 0
    }
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  products: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  product: {
    minWidth: 300,
    padding: "0.5rem 0",
    backgroundColor: "#f5f5f5",
    boxShadow: "1px 5px 10px 1px #c5c5c5",
    borderTop: "1px solid #c9c9c9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeft: "10px solid #cfcfcf",
    "& svg": {
      transform: "rotate(-90deg)",
      marginRight: 10,
      opacity: 0
    },
    "&:hover": {
      backgroundColor: "#e4e4e4",
      transition: "all 250ms",
      cursor: "pointer",
      borderLeft: "10px solid #989898",
      "& svg": {
        opacity: 1
      }
    }
  },
  productContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 10,
    minWidth: 130,
    "& p": {
      marginLeft: 20,
      width: 200,
      textAlign: "left"
    }
  },

  productSelected: {
    minWidth: 300,
    padding: "0.5rem 0",
    backgroundColor: "#dbdbdb",
    boxShadow: "1px 5px 10px 1px #c5c5c5",
    borderTop: "1px solid #c9c9c9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeft: "10px solid #d8001f",
    "& svg": {
      transform: "rotate(90deg)",
      transition: "transform 200ms",
      marginRight: 10
    },
    "&:hover": {
      cursor: "pointer",
      "& svg": {
        marginRight: 10
      }
    }
  }
}));
