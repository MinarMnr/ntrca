import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const AuthRoute = ({ component: Component, ...rest }) => {
  let accessToken = Cookies.get("access_token");
  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken != null && accessToken.length ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AuthRoute;
