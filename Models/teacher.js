const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
    },
    schoolCity: {
      type: String,
    },
    schoolEmail: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      select: false,
    },
    resetToken: {
      type: String,
      default: null,
      select: false,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
