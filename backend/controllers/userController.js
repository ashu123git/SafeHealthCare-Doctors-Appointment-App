const userModel = require("../models/User");
const bcrypt = require("bcryptjs");

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
        .send({ success: false, message: "User already exists" });
    }
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    req.body.password = hashedPassword;

    const newUser = new userModel(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log("Some error");
    res.status(500).send({ success: false, message: `${error.message}` });
  }
};
const loginController = () => {};

module.exports = { loginController, signupController };
