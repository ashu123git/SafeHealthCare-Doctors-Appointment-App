import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import DoctorCard from "../components/DoctorCard";
import { Row } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const { user } = useSelector((state) => state.user);
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "https://safe-health-care.onrender.com/api/v1/user/getDocList",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
      // console.log(res);
    } catch (error) {
      // console.log("Yes");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div>
        {user.isDoctor ? (
          <div>
            <h2 className="text-center">
              Welcome {user.name}. Congratulations for becoming a doctor!
            </h2>
            <hr />
            <h3 style={{ color: "blue" }} className="mb-4 mt-2">
              Here are the list of things you can do:
            </h3>
            <ol style={{ color: "green" }} className="fs-5">
              <li
                onClick={() => navigate("/notification")}
                className="m-3"
                style={{ cursor: "pointer" }}
              >
                Check your notification by clicking here.
              </li>
              <li
                onClick={() => navigate("/doctor-appointments")}
                className="m-3"
                style={{ cursor: "pointer" }}
              >
                Check your appointment lists by clicking here.
              </li>
              <li className="m-3">Update your profile.</li>
            </ol>
          </div>
        ) : (
          <div>
            <h1 className="text-center">Available Doctors</h1>
            <Row>
              {doctors.length != 0
                ? doctors.map((doct) => <DoctorCard doctor={doct} />)
                : null}
            </Row>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Homepage;
