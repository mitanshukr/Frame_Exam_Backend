const { Draft } = require("../models/examSet");

exports.getAllDraft = (req, res, next) => {
  Draft.find({ "creator.id": "123" }).then((response) => {
    res.status(200).json({
      data: response,
    });
  });
};

exports.getDraft = (req, res, next) => {};

exports.updateDraft = (req, res, next) => {};

exports.postDraft = (req, res, next) => {
  const body = req.body;
  console.log(body);
  const examDraft = new Draft({
    ...body,
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
