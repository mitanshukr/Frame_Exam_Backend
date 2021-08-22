const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const { validationResult } = require("express-validator");

// const transport = require('../middleware/mailer-sendgrid');
const Teacher = require("../Models/teacher");

exports.postLogin = (req, res, next) => {
  // const errors = validationResult(req);
  // if(!errors.isEmpty()){
  //   const error = new Error("Input Validation Failed!");
  //   error.status = 422;
  //   error.data = errors.array();
  //   throw error;
  // }
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser = null;

  Teacher.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found!");
        error.status = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isPwdValid) => {
      if (!isPwdValid) {
        const error = new Error("The password is not valid!");
        error.status = 401;
        throw error;
      }
      if (!loadedUser.isEmailVerified) {
        const error = new Error("Login Denied! Please verify your Email.");
        error.status = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
          message:
            "Do not share the Token with anyone. Token is valid for an hour.",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        email: loadedUser.email,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.postSignup = (req, res, next) => {
  // const errors = validationResult(req);
  // if(!errors.isEmpty()){
  //   const error = new Error("Input Validation Failed!");
  //   error.status = 422;
  //   error.data = errors.array();
  //   throw error;
  // }
  const body = req.body;
  const password = req.body.password;
  const userPayload = {};
  bcrypt
    .hash(password, 12)
    .then((hashedPwd) => {
      const teacher = new Teacher({
        email: body.email,
        password: hashedPwd,
        name: body.name,
        schoolName: body.schoolName,
        schoolEmail: body.schoolEmail,
        schoolCity: body.schoolCity,
        isEmailVerified: true,     //CHANGE IT TO FALSE
      });
      return teacher.save();
    })
    .then((user) => {
      const buffer = crypto.randomBytes(32);
      const token = buffer.toString("hex");
      user.verificationToken = token;
      return user.save();
    })
    .then((user) => {
      userPayload._id = user._id.toString();
      userPayload.email = user.email;
      userPayload.name = user.name;
      userPayload.isEmailVerified = user.isEmailVerified;

      // return transport.sendMail({
      //   to: user.email,
      //   from: process.env.SENDGRID_EMAIL,
      //   subject: 'Sign up Successful!',
      //   html: `<h3>Welcome ${user.name} to <strong>RestIndia REST API</strong> Insider Team.</h3>
      //           <p>Please click on the <a href="${process.env.ROOT_URL}/admin/verify-email/${user._id.toString()}/${user.verificationToken}">link</a> to verify your email.</p>
      //           <p>Your Account will be forwarded for approval after successful email verification. It may take 1 or 2 days to get your account approved.</p>
      //           <small>Confidential. Please do not share.</small>`,
      // });
    })
    .then((response) => {
      res.status(201).json({
        message: "Signup Successful! Verification Pending.",
        verification: `Please verify your Email. Verification link sent to your mail: [${response?.message}]`,
        data: userPayload,
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};
