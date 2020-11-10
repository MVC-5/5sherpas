import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";

function ProtectedRoute({ children, ...rest }) {
  const { auth } = useContext(AuthContext);

  const isLoggedIn = sessionStorage.getItem("loggedIn");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth || isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
