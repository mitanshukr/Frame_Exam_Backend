const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema(
  {
    name: {
      type: "String",
    },
    duration: {
      type: "Number",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    category: {
      type: ["String"],
    },
    allowedAttempts: {
      type: "Number",
    },
    shuffleQuestions: {
      type: "Boolean",
    },
    ShuffleOptions: {
      type: "Boolean",
    },
    ShowResult: {
      type: "Boolean",
    },
    requireWebcam: {
      type: "Boolean",
    },
    "Require Microphone": {
      type: "Boolean",
    },
    published: {
      type: "Boolean",
    },
    password: {
      type: "Number",
    },
    accessLink: {
      type: "String",
    },
    allowedAccess: {
      type: "Boolean",
    },
    UserAccess: {
      type: ["String"],
    },
    questions: {
      type: ["Mixed"],
    },
    creator: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
      email: { type: String, ref: "Teacher" },
    },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);
const Draft = mongoose.model("Draft", examSchema);
const OldExam = mongoose.model("OldExam", examSchema);

module.exports = { Exam, Draft, OldExam };
