import React from "react";
import "../styles/homeStyles.css";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="sizing">
      <footer
        className="text-center text-lg-start"
        style={{ backgroundColor: "#db6930" }}
        // style="background-color: #db6930;"
      >
        <div className="container d-flex justify-content-center py-5">
          <Link
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
            style={{ backgroundColor: "#54456b" }}
            to="https://www.linkedin.com/in/ashutosh-choubey-833673191/"
            // style="background-color: #54456b;"
          >
            <i className="fa-brands fa-linkedin"></i>
          </Link>
          <Link
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
            style={{ backgroundColor: "#54456b" }}
            to="https://github.com/ashu123git"
            // style="background-color: #54456b;"
          >
            <i className="fa-brands fa-github"></i>
          </Link>
          <Link
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
            style={{ backgroundColor: "#54456b" }}
            to="https://www.instagram.com/"
            // style="background-color: #54456b;"
          >
            <i className="fab fa-instagram"></i>
          </Link>
          <Link
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
            style={{ backgroundColor: "#54456b" }}
            to="https://twitter.com/home"
            // style="background-color: #54456b;"
          >
            <i className="fab fa-twitter"></i>
          </Link>
        </div>
        <div className="text-center text-black">
          For more details about this application, please go to my github page
          by clicking{" "}
          <Link
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
            style={{ backgroundColor: "#54456b" }}
            to="https://twitter.com/home"
            // style="background-color: #54456b;"
          >
            here
          </Link>
          . You will get admin credentials and some doctors credentials there.
          So that, you can login as admin and can do the testing.
        </div>
        <div
          className="text-center text-white p-3"
          style={{ backgroundColor: "grey" }}
          //   style="background-color: rgba(0, 0, 0, 0.2);"
        >
          © 2023 Copyright: &nbsp;
          <a className="text-white" href="https://safehealthcare.netlify.app">
            Created by Ashutosh Choubey
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
