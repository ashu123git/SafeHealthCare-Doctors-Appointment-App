// Layout page to show the basic layout of homepage and mnay other pages
import React from "react";
import "../styles/homeStyles.css";
import { SidebarMenu } from "../Data/sideData";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  // Uselocation is used so that wwhen we click on any menu item on sidebar, then it's style will change
  const location = useLocation();
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
              {SidebarMenu.map((menus) => {
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
            </div>
          </div>
          <div className="content">
            <div className="header">Header</div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
