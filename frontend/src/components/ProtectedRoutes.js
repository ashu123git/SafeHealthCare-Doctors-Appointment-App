// This is created so that if a user has authentication key that is he is already logged in then the children should appear and he will not be able to go to login or signup page. Else vice-versa

import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  if (localStorage.getItem("authToken")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
