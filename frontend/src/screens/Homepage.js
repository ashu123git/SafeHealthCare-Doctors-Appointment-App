import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import DoctorCard from "../components/DoctorCard";
import { Row } from "antd";

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/user/getDocList",
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
        <h1 className="text-center">Available Doctors</h1>
        <Row>
          {doctors.length != 0
            ? doctors.map((doct) => <DoctorCard doctor={doct} />)
            : null}
        </Row>
      </div>
    </Layout>
  );
};

export default Homepage;
