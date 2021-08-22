const { Draft } = require("../models/examSet");

exports.getAllDraft = (req, res, next) => {
  const userId = req.params.userId.trim(); //6121c005c91539547cdedacc
  Draft.find({ "creator._id": userId }).then((response) => {
    res.status(200).json(response);
  });
};

exports.getDraft = (req, res, next) => {};

exports.updateDraft = (req, res, next) => {};

exports.postDraft = (req, res, next) => {
  const body = req.body;
  console.log(body);
  const examDraft = new Draft({
    ...body,
    creator: {
      _id: "6121c005c91539547cdedacc", //req.userId,
      email: "mitanshu@test.com", //req.userEmail,
    },
  });
  examDraft
    .save()
    .then((response) => {
      res.status(201).json({
        message: "Draft created Successfully!",
        data: response,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};
