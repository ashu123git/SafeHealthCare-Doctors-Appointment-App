// This is created so that if a user has authentication key that is he is already logged in then the children should appear and he will not be able to go to login or signup page. Else vice-versa

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // console.log(user);

  const getUser = async () => {
    try {
      dispatch(showLoading);
      const res = await axios.post(
        "https://safe-health-care.onrender.com/api/v1/user/userData",
        {
          authToken: localStorage.getItem("authToken"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      dispatch(hideLoading());
      // console.log(res);
      if (res.data.success) {
        // console.log("Success");
        // console.log(res.data.data);
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to="/login" />;
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (user == "default") {
      // console.log("This Ran");
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("authToken")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
