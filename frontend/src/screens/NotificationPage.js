// To get all the notification, mark them as read and delete all read notifications.

import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";

const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get all notification moved to read notifications from unread notifications
  const handleMarkRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        // "http://localhost:5000/api/v1/user/getNotification",
        "https://safe-health-care.onrender.com/api/v1/user/getNotification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (res.data.success) {
        // For double reload. Temporary solution. Will be removed afterwards
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  //delete all notifications from read tab
  const handleDelete = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        // "http://localhost:5000/api/v1/user/deleteNotification",
        "https://safe-health-care.onrender.com/api/v1/user/deleteNotification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        // Temporary solution. Double reload
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went");
    }
  };
  //   console.log(user.notification);
  //   console.log(currNoti);

  // below Tabs property from ant-design is used to show the tabbed pane.
  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="Un Read" key={0}>
          <div className="d-flex justify-content-end">
            <button
              className="p-2 btn btn-success m-3"
              onClick={handleMarkRead}
              style={{ cursor: "pointer" }}
            >
              Mark all as Read
            </button>
          </div>
          {user != "default" ? ( // Getting all the notifications
            user.notification.length == 0 ? (
              <h6 className="text-center">Inbox is empty.</h6>
            ) : (
              user.notification.map((notificationMsg) => (
                <div
                  className="card"
                  onClick={() => navigate(notificationMsg.data.onClickPath)}
                  style={{ cursor: "pointer" }}
                >
                  {/* <Link to={notificationMsg.data.onClickPath}> */}
                  <div className="card-text">{notificationMsg.message}</div>
                  {/* </Link> */}
                </div>
              ))
            )
          ) : null}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <button
              className="p-2 btn btn-danger m-3"
              onClick={handleDelete}
              style={{ cursor: "pointer" }}
            >
              Delete all read
            </button>
          </div>
          {user != "default" ? (
            user.seenNoti.length == 0 ? (
              <h6 className="text-center">No Read Messages</h6>
            ) : (
              user.seenNoti.map((notificationMsg) => (
                <div
                  className="card"
                  onClick={() => navigate(notificationMsg.data.onClickPath)}
                >
                  {/* <Link to={notificationMsg.data.onClickPath}> */}
                  <div className="card-text">{notificationMsg.message}</div>
                  {/* </Link> */}
                </div>
              ))
            )
          ) : null}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
