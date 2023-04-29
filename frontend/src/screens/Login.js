import React from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    // console.log(values);
    try {
      const validCreds = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        values
      );
      console.log(validCreds);

      // const jsonData = validCreds.json();
      // console.log(jsonData);
      if (validCreds.data.success) {
        localStorage.setItem("authToken", validCreds.data.authToken);
        message.success(validCreds.data.message);
        navigate("/");
      } else {
        message.error(validCreds.data.message);
      }
    } catch (error) {
      console.log("Some Error");
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="form-container">
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
