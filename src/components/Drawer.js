import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from "@material-ui/icons/List";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PeopleIcon from "@material-ui/icons/People";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";

const drawerWidth = 240;

const MainDrawer = props => {
  const classes = useStyles();

  const authorization = props.authorization;
  const { isOpen, setIsOpen } = props;

  const USERGROUP = {
    ADMIN: "0",
    PRODUCT_OWNER: "1",
    SALESPERSON: "2"
  };

  function handleDrawerClose() {
    setIsOpen(false);
  }

  const links = [
    { name: "Home", url: "/", icon: HomeIcon },
    { name: "Products", url: "/products", icon: ListIcon }
  ];

  if (authorization.userGroup) {
    links.push({
      name: "Create product",
      url: "/create-product",
      icon: PostAddIcon
    });
  }

  if (authorization.userGroup === USERGROUP.ADMIN) {
    links.push({ name: "Users", url: "/users", icon: PeopleIcon });
    links.push({
      name: "Create user",
      url: "/create-user",
      icon: PersonAddIcon
    });
    links.push({
      name: "Deleted products",
      url: "/deleted-products",
      icon: RestoreFromTrashIcon
    });
  }

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen
        })
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {!isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {links.map(link => {
          const Icon = link.icon;
          return (
            <Link to={link.url} key={link.url} className={classes.link}>
              <ListItem button key={link.name}>
                <ListItemIcon>{<Icon />}</ListItemIcon>
                <ListItemText primary={link.name} />
              </ListItem>
            </Link>
          );
        })}
        <Divider />
      </List>
      <List className={classes.settings}>
        <Link to={"/settings"} className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default MainDrawer;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1
    }
  },

  link: {
    color: "black"
  },
  settings: {
    display: "flex",
    flexDirection: "column-reverse",
    height: "100%"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  }
}));

MainDrawer.propTypes = {
  authorization: PropTypes.object,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func
};
