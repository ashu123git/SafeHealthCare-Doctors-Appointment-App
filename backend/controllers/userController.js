// This usercontroller is used for multiple routes that are used in routes folder.

const userModel = require("../models/User");
const doctorModel = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign-Up Route
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

// Login Controller
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
    // For maintaining session and authorization
    const authToken = jwt.sign({ id: userValid._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    res.json({ success: true, message: "Successfully logged in", authToken });
  } catch (error) {
    console.log("Some Error");
    res.status(500).json({ success: false, message: `${error.message}` });
  }
};

// Authorization controller.
// This will check whether a user exists in the database with the provided auth token.
const authController = async (req, res) => {
  // console.log(req.body);
  try {
    const userFind = await userModel.findById({ _id: req.body.userId });
    // console.log(userFind);
    if (!userFind) {
      res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      // console.log("Found");
      res.status(200).send({
        message: "Success",
        success: true,
        data: {
          name: userFind.name,
          email: userFind.email,
          isAdmin: userFind.isAdmin,
          isDoctor: userFind.isDoctor,
          notification: userFind.notification,
          seenNoti: userFind.seenNoti,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Some Error",
      success: false,
    });
  }
};

//Apply Doctor Controller
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "Apply Doctor Request",
      message: `${newDoctor.firstname} ${newDoctor.lastname} has applied for doctor.`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstname + " " + newDoctor.lastname,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(200).send({
      success: true,
      message: "Doctor account applied successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while applying for doctor",
      success: false,
    });
  }
};

module.exports = {
  loginController,
  signupController,
  authController,
  applyDoctorController,
};
