const mongoose = require("mongoose");

const userShema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    role: {
      type: String,
      default: "customer",
      enum: ["customer", "admin"],
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userShema);
