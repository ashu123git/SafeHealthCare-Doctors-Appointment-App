// Used for routes that are defined in routes folder

const userModel = require("../models/User");
const doctorModel = require("../models/Doctor");

// Get list of all users from database
const getUserController = async (req, res) => {
  // console.log("Reached here");
  try {
    const currUser = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "User found",
      data: currUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Get list of all users from database
const getDoctorController = async (req, res) => {
  try {
    const currDoctor = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "User Found",
      data: currDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Change status of doctor's account to approved
const changeStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const findDoc = await doctorModel.findByIdAndUpdate(doctorId, { status });
    // console.log(findDoc);
    const findUser = await userModel.findOne({ _id: findDoc.userId });
    // console.log(findUser);
    const notification = findUser.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your doctor account has been ${status}`,
      onClickPath: "/notification",
    });
    findUser.isDoctor = status === "approved" ? true : false;
    await findUser.save();
    res.status(200).send({
      success: true,
      message: "Account status updated",
      data: findDoc,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while changing the status",
    });
  }
};

module.exports = {
  getUserController,
  getDoctorController,
  changeStatusController,
};
