// Layout page to show the basic layout of homepage and mnay other pages
import React from "react";
import "../styles/homeStyles.css";
import { adminMenu, userMenu } from "../Data/sideData";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge, message } from "antd";
import Footer from "./Footer";

const Layout = ({ children }) => {
  // Uselocation is used so that when we click on any menu item on sidebar, then it's style will change
  const location = useLocation();
  // Current state of user
  const { user } = useSelector((state) => state.user);

  const handleClick = () => {
    localStorage.removeItem("authToken");
    // dispatch(setUser("default"));
    message.success("Logged Out Successfully");
  };

  // For notification count
  let len;
  let identity;
  if (user == "default" || user == null) console.log("");
  else {
    len = user.notification.length;
    identity = user.id; // To open doctor's profile dynamically according to their unique id
    // console.log(identity);
  }
  // console.log(user);
  // if (user) {

  // ================== Doctor Menu ====================
  const doctorMenu = [
    {
      name: "Home",
      icon: "fa-solid fa-house-chimney",
      path: "/",
    },
    {
      name: "Appointments",
      icon: "fa-solid fa-calendar-check",
      path: "/doctor-appointments",
    },
    {
      name: "Profile",
      icon: "fa-solid fa-user",
      path: `/doctor/profile/${identity}`,
    },
  ];

  // ================== Doctor Menu ====================

  const currMenu = user.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu; // To show the menus corresponding to user
  // }

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>SafeHealthCare</h6>
              <hr />
            </div>
            <div className="menu">
              {currMenu.map((menus) => {
                const isActive = location.pathname === menus.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menus.icon} />
                      <Link to={menus.path}>{menus.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={"menu-item"} onClick={handleClick}>
                <i className="fa-solid fa-right-from-bracket" />
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <Link to="/notification">
                  <Badge count={len}>
                    <i className="fa-sharp fa-solid fa-bell"></i>
                  </Badge>
                </Link>
                {user.isAdmin ? (
                  <Link to="/admin/profile">{user.name}</Link>
                ) : user.isDoctor ? (
                  <Link to="/profile">{user.name} </Link>
                ) : (
                  <Link to="/user/profile">{user.name} </Link>
                )}
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
