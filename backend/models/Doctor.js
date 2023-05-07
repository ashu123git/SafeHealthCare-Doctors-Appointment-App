const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "first name is required"],
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    phonenum: {
      type: String,
      required: [true, "phone number is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    fees: {
      type: Number,
      required: [true, "fees is required"],
    },
    timings: {
      type: Object,
      required: [true, "work timings is required"],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("doctor", doctorSchema);
