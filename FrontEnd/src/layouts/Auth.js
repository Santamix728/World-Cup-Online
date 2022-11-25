import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar

import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
// core components

import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/auth" to="/auth/login-page" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Auth() {
  const classes = useStyles();
  const mainPanel = React.createRef();
  const getRoute = () => {
    return window.location.pathname !== "/auth/maps";
  };
  return (
  <div className={classes.containerCenter} ref={mainPanel} >
    {getRoute() ? (
    <div className={classes.content}>
      <div className={classes.center}>
        {switchRoutes}
        </div>
      </div>
      ) : (
      <div className={classes.map}>{switchRoutes}</div>
      )}
  </div>
  );
}
