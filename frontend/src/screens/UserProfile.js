// To show User's profile and also to update the profile

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Form, Input, Row, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
// import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [currUser, setCurrUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserData = async () => {
    // console.log("This is running");
    // console.log(params.id);
    try {
      //   console.log("Running try");
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/getUserProfile",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      //   console.log(res);

      if (res.data.success) {
        setCurrUser(res.data.data); //Setting final state same as the data comes from backend.
        // console.log(res.data.data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/updateProfile",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Manage Profile</h1>
      {currUser != null ? (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={currUser}
        >
          <h4>Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Name" name="name" required>
                <Input type="text" placeholder="Your Name"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Email" name="email" required>
                <Input type="email" placeholder="Your email"></Input>
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </Form>
      ) : null}
    </Layout>
  );
};

export default UserProfile;
