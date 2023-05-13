const express = require("express");
const {
  getUserController,
  getDoctorController,
  changeStatusController,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all Users List
router.get("/getUsersList", authMiddleware, getUserController);

// Get all Doctors list
router.get("/getDoctorList", authMiddleware, getDoctorController);

// Change status
router.post("/changeStatus", authMiddleware, changeStatusController);

module.exports = router;
