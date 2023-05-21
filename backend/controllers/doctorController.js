// Controller for doctor to get doctor profile and also to update the profile

const doctorModel = require("../models/Doctor");
const appointmentModel = require("../models/Appointment");
const userModel = require("../models/User");

// Get current doctor profile
const getProfileController = async (req, res) => {
  // console.log("Reached");
  try {
    const checkDoctor = await doctorModel.findOne({ userId: req.body.userId });
    // console.log(checkDoctor);
    if (checkDoctor) {
      res.status(200).send({
        success: true,
        message: "Doctor Found successfully",
        data: checkDoctor,
      });
    } else {
      console.log("No doctor found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error occured while finding doctor",
    });
  }
};

// Update current doctor profile
const updateProController = async (req, res) => {
  try {
    const doc = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Successfully update profile",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating doctor's profile",
    });
  }
};

// Get all the appointment lists that are booked by users for current doctor.
const getAppointmentController = async (req, res) => {
  try {
    const currDoc = await doctorModel.findOne({ userId: req.body.userId });
    const doctorId = currDoc._id;
    const currApoint = await appointmentModel.find({ doctorId: doctorId });
    res.status(200).send({
      success: true,
      message: "Appointment details fetched successfully",
      data: currApoint,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting apppointment list.",
    });
  }
};

// Approve or reject the appointment booked by users
const approveController = async (req, res) => {
  try {
    // console.log(req.body.appointmentId);
    const currAppointment = await appointmentModel.findOne({
      _id: req.body.appointmentId,
    });
    // console.log(currAppointment);
    const currDoctor = currAppointment.doctorId;
    const currUser = currAppointment.userId;
    currAppointment.status = req.body.status; // Check for some error here.
    currAppointment.save();
    const userss = await userModel.findOne({ _id: currUser });
    const notification = userss.notification;
    notification.push({
      type: "Appointment-request-approved",
      message: `Your Appointment has been updated. Current Status = ${req.body.status}`,
    });
    userss.save();
    const doc1 = await doctorModel.findOne({ _id: currDoctor });
    doc1.isAvailable = true;
    doc1.save();
    res.status(200).send({
      success: true,
      message: `Appointment ${req.body.status} successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while approving appointment",
    });
  }
};

module.exports = {
  getProfileController,
  updateProController,
  getAppointmentController,
  approveController,
};
