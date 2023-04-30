import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css"; // so that we can use ant design functionality
import "./index.css";
import App from "./App";
// We have to wrap out index .js around provider so that we can use our state anywhere that we created using redux. This provider needs Store folder from where it will look the reducers and states.
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
