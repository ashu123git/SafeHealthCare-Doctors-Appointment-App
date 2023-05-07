const express = require("express");
const {
  loginController,
  signupController,
  authController,
  applyDoctorController,
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

module.exports = router;
