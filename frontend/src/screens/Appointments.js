// Page to get list of all appointmnets made by the user

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Table } from "antd";

const Appointments = () => {
  //setting the state of appointmewnts from the backend
  const [appointment, setAppointment] = useState([]);

  const getAppointment = async () => {
    try {
      const res = await axios.get(
        // "http://localhost:5000/api/v1/user/appointmentHistory",
        "https://safe-health-care.onrender.com/api/v1/user/appointmentHistory",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res.data.data);
        setAppointment(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  // Ant design table feature
  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "_id",
    },
    {
      title: "Doctor Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstname} {record.doctorInfo.lastname}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phonenum",
      render: (text, record) => <span>{record.doctorInfo.phonenum}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <h1 className="text-center">Appointment History</h1>
      <Table columns={columns} dataSource={appointment} />
    </Layout>
  );
};

export default Appointments;
