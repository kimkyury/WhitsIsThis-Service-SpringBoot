import React from "react";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({authenticated, authenticated2, component: Component}) => {
  return (
    authenticated ? Component : <Navigate to="/"/>
  );
}

export default PrivateRoute;
