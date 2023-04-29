const express = require("express");
const {
  loginController,
  signupController,
} = require("../controllers/userController");

const router = express.Router();

//Login User
router.post("/login", loginController);

//Register User
router.post("/signup", signupController);

module.exports = router;
