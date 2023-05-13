const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getProfileController,
  updateProController,
} = require("../controllers/doctorController");
// const { updateProController } = require("../controllers/doctorController");

const router = express.Router();

// Get Doctor Profile
router.post("/getDocProfile", authMiddleware, getProfileController);

// Update Doctor Profile
router.post("/updateProfile", authMiddleware, updateProController);

module.exports = router;
