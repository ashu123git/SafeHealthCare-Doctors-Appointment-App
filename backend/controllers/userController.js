const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  //   console.log(req.body);
  //   console.log(req);
  //   let userEmail = req.body.email;
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    // console.log(existingUser);
    if (existingUser) {
      return res
        .status(200)
        .json({ success: false, message: "User already exists" });
    }
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    req.body.password = hashedPassword;

    const newUser = new userModel(req.body);
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log("Some error");
    res.status(500).json({ success: false, message: `${error.message}` });
  }
};
const loginController = async (req, res) => {
  try {
    const userValid = await userModel.findOne({ email: req.body.email });
    // console.log(userValid);
    if (!userValid) {
      return res
        .status(200)
        .json({ success: false, message: "Enter Valid email" });
    }
    const cmpPassword = await bcrypt.compare(
      req.body.password,
      userValid.password
    );
    if (!cmpPassword) {
      //   console.log("Yes");
      return res
        .status(200)
        .send({ success: false, message: "Enter Valid password" });
    }
    const authToken = jwt.sign({ id: userValid._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    res.json({ success: true, message: "Successfully logged in", authToken });
  } catch (error) {
    console.log("Some Error");
    res.status(500).json({ success: false, message: `${error.message}` });
  }
};

module.exports = { loginController, signupController };
