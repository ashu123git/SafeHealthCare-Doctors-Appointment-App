// Controller for doctor to get doctor profile and also to update the profile

const doctorModel = require("../models/Doctor");

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

module.exports = { getProfileController, updateProController };
