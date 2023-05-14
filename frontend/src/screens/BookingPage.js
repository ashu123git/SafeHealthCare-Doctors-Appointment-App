//This is used when user clicks on the available doctors to book appointment with them.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";

const BookingPage = () => {
  const params = useParams(); // To get user/doctor id from URL
  const [doctors, setDoctors] = useState([]);
  const getDocData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/getSingleDocInfo",
        { doctorId: params.doctorId },
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
    getDocData();
  }, []);

  return (
    <Layout>
      <h3 className="text-center">Book Appointment</h3>
      <div className="container">
        {doctors != [] ? (
          <div className="m-5">
            <h4>
              Dr. {doctors.firstname} {doctors.lastname}
            </h4>
            <h4>Consultation Charges: ₹{doctors.fees}</h4>
            <h4>Speciality: {doctors.specialization}</h4>
            <button className="btn btn-dark mt-2">Book Now</button>{" "}
            {/*This has to be implemented */}
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default BookingPage;
