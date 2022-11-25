import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import "assets/css/material-dashboard-react.css?v=1.10.0";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/admin" component={Admin} />  
      <Redirect from="/" to="/auth/login-page" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
