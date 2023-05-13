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

module.exports = { getUserController, getDoctorController };
