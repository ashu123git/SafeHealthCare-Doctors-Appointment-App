// To show doctors info in the form of a card under all avialble doctors in homepage

import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  //   console.log(doctor);
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/appointment/${doctor._id}`)}
      >
        <div className="card-header">
          Dr. {doctor.firstname} {doctor.lastname}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience</b> {doctor.experience}
          </p>
          <p>
            <b>Fees</b> {doctor.fees}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorCard;
