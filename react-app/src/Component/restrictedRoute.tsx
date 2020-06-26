import { Redirect, Route } from "react-router-dom";

import React from "react";
import { getStoredAuthToken } from "../Utils/authToken";

const RestrictedRoute = (props: any) => {
  const { Component, ...rest } = props;
  const token = getStoredAuthToken();

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} {...rest} /> : <Redirect to="/login" />
      }
    />
  );
};

export default RestrictedRoute;
