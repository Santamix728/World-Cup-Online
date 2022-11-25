import React from "react";
import propTypes from "prop-types";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/simpleNavbarStyle.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(styles);

export default function SimpleNavbar(props){
  const { routes } = props;
  const classes = useStyles();
  return(
    <List className={classes.list}>
    {routes.map((route, index) => {
        if((sessionStorage.getItem("Type") === "user" && route.user) || (sessionStorage.getItem("Type") === "admin" && route.admin)){
          return(
            <NavLink
            to={route.layout + route.path}
            className={classes.item}
            key={index}
            >
              <ListItem button className={classes.itemLink}>
                <ListItemText
                primary={route.name}
                className={classNames(classes.itemText)}
                disableTypography={true}
                />
              </ListItem>
            </NavLink>
          )
        }
      })
    }
    </List>
  )
}

SimpleNavbar.propTypes = {
    routes: propTypes.arrayOf( propTypes.object ),
};

