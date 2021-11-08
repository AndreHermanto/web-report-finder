import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { AuthGuard } from "../components/pages/AuthGuard";

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <AuthGuard />,
    })}
    {...args}
  />
);

export default ProtectedRoute;