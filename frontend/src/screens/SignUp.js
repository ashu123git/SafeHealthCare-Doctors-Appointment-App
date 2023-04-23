import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";

const SignUp = () => {
  const handleFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">
            Already a User?
          </Link>
        </Form>
      </div>
    </>
  );
};

export default SignUp;
