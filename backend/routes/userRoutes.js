const express = require("express");
const {
  loginController,
  signupController,
  authController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//Login User
router.post("/login", loginController);

//Register User
router.post("/signup", signupController);

//Auth
router.post("/userData", authMiddleware, authController);

module.exports = router;
