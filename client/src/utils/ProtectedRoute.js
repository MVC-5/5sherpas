import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";

function ProtectedRoute({ children, ...rest }) {
  const { userId } = useContext(AuthContext);
  console.log(userId);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userId ? (
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
