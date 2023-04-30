import { React, useState } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(credentials);
    try {
      dispatch(showLoading());
      const response = await fetch("http://localhost:5000/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      dispatch(hideLoading());

      const jsonVal = await response.json();
      // console.log(jsonVal);
      if (jsonVal.success) {
        message.success("User registered successfully");
        navigate("/login");
      } else {
        message.error(jsonVal.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  function handleChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <>
      <div className="container">
        <form
          className="w-50 m-auto mt-5 border bg-dark text-white border-success rounded"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="exampleInputName" className="form-label fs-3">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={credentials.name}
              className="form-control"
              // placeholder="Enter name"
              onChange={handleChange}
            />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label fs-3">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              className="form-control"
              // placeholder="Enter email"
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label fs-3">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              className="form-control"
              // placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">
            Already a User ?
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
