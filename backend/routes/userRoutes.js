const express = require("express");
const {
  loginController,
  signupController,
  authController,
  applyDoctorController,
  getNotificationController,
  deleteNotificationController,
  getDocListController,
  getDocInfoController,
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

// Get doctors list at homepage
router.get("/getDocList", authMiddleware, getDocListController);

// Book an appointment with doctor
router.post("/getSingleDocInfo", authMiddleware, getDocInfoController);

module.exports = router;
