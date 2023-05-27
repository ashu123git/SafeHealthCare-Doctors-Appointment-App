// This is for showing the current list of doctors with their status (pending/approved/rejected)

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Doctors = () => {
  //Getting the initial and final state of doctors
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/admin/getDoctorList",
        // "https://safe-health-care.onrender.com/api/v1/admin/getDoctorList",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Runnig getDoctors function and soon as this page loads
  useEffect(() => {
    getDoctors();
  }, []);

  const handleClick = async (record, status) => {
    // console.log(record.userId);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/admin/changeStatus",
        // "https://safe-health-care.onrender.com/api/v1/admin/changeStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  // Using ant-d table feature to show the data in a form of tables
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstname} {record.lastname}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phonenum",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex">
          {record.status != "approved" ? (
            <button
              className="btn btn-success"
              onClick={() => {
                handleClick(record, "approved");
              }}
            >
              Approve
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => handleClick(record, "rejected")}
            >
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">Doctors List</h1>
      <Table columns={columns} dataSource={doctors}></Table>
    </Layout>
  );
};

export default Doctors;
