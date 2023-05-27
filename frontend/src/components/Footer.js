import React from "react";

const Footer = () => {
  return (
    <div className="container my-5">
      <footer
        className="text-center text-lg-start"
        style={{ backgroundColor: "#db6930" }}
        // style="background-color: #db6930;"
      >
        <div className="container d-flex justify-content-center py-5">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
            style={{ backgroundColor: "#54456b" }}
            // style="background-color: #54456b;"
          >
            <i className="fab fa-facebook-f"></i>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
            style={{ backgroundColor: "#54456b" }}
            // style="background-color: #54456b;"
          >
            <i className="fab fa-youtube"></i>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
            style={{ backgroundColor: "#54456b" }}
            // style="background-color: #54456b;"
          >
            <i className="fab fa-instagram"></i>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2"
            style={{ backgroundColor: "#54456b" }}
            // style="background-color: #54456b;"
          >
            <i className="fab fa-twitter"></i>
          </button>
        </div>
        <div
          className="text-center text-white p-3"
          style={{ backgroundColor: "grey" }}
          //   style="background-color: rgba(0, 0, 0, 0.2);"
        >
          © 2023 Copyright:
          <a className="text-white" href="https://safehealthcare.netlify.app">
            Created by Ashutosh Choubey
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
