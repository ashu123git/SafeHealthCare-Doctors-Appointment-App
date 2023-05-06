import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const Homepage = () => {
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/userData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        }
      );
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
        <h1>Home Page</h1>
      </div>
    </Layout>
  );
};

export default Homepage;
