// A page for doctors to see all the appointments booked by users for them.

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";

const AppointmentList = () => {
  const dispatch = useDispatch();
  const [appointment, setAppointment] = useState([]);

  const getAppointmentList = async () => {
    try {
      const res = await axios.get(
        // "http://localhost:5000/api/v1/doctor/appointment",
        "https://safe-health-care.onrender.com/api/v1/doctor/appointment",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (res.data.success) {
        setAppointment(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (record, status) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        // "http://localhost:5000/api/v1/doctor/approveBooking",
        "https://safe-health-care.onrender.com/api/v1/doctor/approveBooking",
        { appointmentId: record._id, status },
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

  useEffect(() => {
    getAppointmentList();
  }, []);

  // Ant design table feature
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div>
          {record.status == "pending" ? (
            <div className="d-flex">
              <button
                className="btn btn-success m-2"
                onClick={() => handleApprove(record, "approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger m-2"
                onClick={() => handleApprove(record, "rejected")}
              >
                Reject
              </button>
            </div>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center">Appointment Lists</h1>
      <Table columns={columns} dataSource={appointment} />
    </Layout>
  );
};

export default AppointmentList;
