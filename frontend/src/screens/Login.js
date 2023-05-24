import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// useDispatch is used so that it can dispatch our reducers that we create in redux folder
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFinish = async (values) => {
    // console.log(values);
    try {
      // To show spinning wheel
      dispatch(showLoading());
      const validCreds = await axios.post(
        "https://safe-health-care.onrender.com/api/v1/user/login",
        values
      );
      // window.location.reload();
      // To hide spinning wheel
      dispatch(hideLoading());
      // console.log(validCreds);

      // const jsonData = validCreds.json();
      // console.log(jsonData);
      if (validCreds.data.success) {
        // window.location.reload();
        localStorage.setItem("authToken", validCreds.data.authToken);
        message.success(validCreds.data.message);
        navigate("/");
      } else {
        message.error(validCreds.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log("Some Error");
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="container-sm m-3 w-29">
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <Link to="/signup" className="m-3 mx-1 btn btn-danger">
            SignUp
          </Link>
        </Form>
      </div>
    </>
  );
};

export default Login;
