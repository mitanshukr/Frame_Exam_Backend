const express = require("express");
const router = express.Router();

const teacherAuthController = require("../Controllers/TeacherAuthController");

router.post("/login", teacherAuthController.postLogin);
router.post("/signup", teacherAuthController.postSignup);
//reset password...etc.

module.exports = router;
