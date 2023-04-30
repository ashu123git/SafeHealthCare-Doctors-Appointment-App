// This is created so that if a user has authentication key that is he is already logged in then he will only be able to go to homepage and nothing else.

import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoutes({ children }) {
  if (localStorage.getItem("authToken")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
