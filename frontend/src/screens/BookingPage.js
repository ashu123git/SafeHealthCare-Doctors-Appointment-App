//This is used when user clicks on the available doctors to book appointment with them.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { message } from "antd";

const BookingPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // To get the current user
  const params = useParams(); // To get user/doctor id from URL
  const [doctors, setDoctors] = useState([]); // To set the state of our doctor
  const getDocData = async () => {
    try {
      const res = await axios.post(
        // "http://localhost:5000/api/v1/user/getSingleDocInfo",
        "https://safe-health-care.onrender.com/api/v1/user/getSingleDocInfo",
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

  // Handle booking when user clicks on book now
  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        // "http://localhost:5000/api/v1/user/booking",
        "https://safe-health-care.onrender.com/api/v1/user/booking",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // Checking the availabliti of a doctor
  const handleCheck = async () => {
    try {
      const res = await axios.post(
        // "http://localhost:5000/api/v1/user/checkAvailability",
        "https://safe-health-care.onrender.com/api/v1/user/checkAvailability",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocData();
  }, []);

  return (
    <Layout>
      <h3 className="text-center">Book Appointment</h3>
      <div className="card">
        {doctors != [] ? (
          <div className="m-5" style={{ width: "25rem" }}>
            <h4>
              Dr. {doctors.firstname} {doctors.lastname}
            </h4>
            <h4>Consultation Charges: ₹{doctors.fees}</h4>
            <h4>Speciality: {doctors.specialization}</h4>
            <div className="d-flex flex-column">
              <button className="btn btn-success mt-2" onClick={handleCheck}>
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default BookingPage;
