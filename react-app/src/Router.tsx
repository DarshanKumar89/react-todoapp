import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Tasks from "./Pages/task";
import RestrictedRoute from "./Component/restrictedRoute";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <RestrictedRoute exact path="/tasks" Component={Tasks} />
        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
