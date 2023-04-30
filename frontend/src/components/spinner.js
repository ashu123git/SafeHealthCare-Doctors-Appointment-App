// This is used to show the spinning icon when a user logs in or signs-up.

import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center spinner">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
