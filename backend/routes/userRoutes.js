const express = require("express");
const {
  loginController,
  signupController,
  authController,
  applyDoctorController,
  getNotificationController,
  deleteNotificationController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//Login User
router.post("/login", loginController);

//Register User
router.post("/signup", signupController);

//Auth
router.post("/userData", authMiddleware, authController);

//Apply Doctor
router.post("/applyDoctor", authMiddleware, applyDoctorController);

//get all notifications
router.post("/getNotification", authMiddleware, getNotificationController);

//delete all notifications
router.post(
  "/deleteNotification",
  authMiddleware,
  deleteNotificationController
);

module.exports = router;
