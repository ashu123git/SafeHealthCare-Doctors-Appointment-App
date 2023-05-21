// To show doctor's profile and also to update the profile

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // This is used to get the dynamic content from URL
import { Button, Col, Form, Input, Row, TimePicker, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams(); // Getting the id field from the URL
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDocData = async () => {
    // console.log("This is running");
    // console.log(params.id);
    try {
      //   console.log("Running try");
      const res = await axios.post(
        "https://safe-health-care.onrender.com/api/v1/doctor/getDocProfile",
        {
          userId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log(res);

      if (res.data.success) {
        setDoctor(res.data.data); //Setting final state same as the data comes from backend.
        // console.log(res.data.data);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocData();
  }, []);

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://safe-health-care.onrender.com/api/v1/doctor/updateProfile",
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
      {doctor != null ? (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={doctor}
        >
          <h4>Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="First Name" name="firstname" required>
                <Input type="text" placeholder="Your First Name"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Last Name" name="lastname" required>
                <Input type="text" placeholder="Your Last Name"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Email" name="email" required>
                <Input type="email" placeholder="Your email"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Phone Number" name="phonenum" required>
                <Input type="text" placeholder="Your Contact Number"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Address" name="address" required>
                <Input type="text" placeholder="Your Address"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="Your Website"></Input>
              </Form.Item>
            </Col>
          </Row>
          <hr />
          <h4>Professional Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Specialization" name="specialization" required>
                <Input type="text" placeholder="Your Specialization"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Experience" name="experience" required>
                <Input type="text" placeholder="Your Experience"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Consultation Charges" name="fees" required>
                <Input type="text" placeholder="Your charges"></Input>
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

export default Profile;
