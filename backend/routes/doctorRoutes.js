const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getProfileController,
  updateProController,
  getAppointmentController,
  approveController,
} = require("../controllers/doctorController");
// const { updateProController } = require("../controllers/doctorController");

const router = express.Router();

// Get Doctor Profile
router.post("/getDocProfile", authMiddleware, getProfileController);

// Update Doctor Profile
router.post("/updateProfile", authMiddleware, updateProController);

// Get appointment lists
router.get("/appointment", authMiddleware, getAppointmentController);

// Approve or Reject Booking
router.post("/approveBooking", authMiddleware, approveController);

module.exports = router;
