const express = require("express");
const {
  getUserController,
  getDoctorController,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all Users List
router.get("/getUsersList", authMiddleware, getUserController);

// Get all Doctors list
router.get("/getDoctorList", authMiddleware, getDoctorController);

module.exports = router;
