const express = require("express");
const mongoose = require("mongoose");

const examDraftRoute = require("./Routes/ExamDraftRoute");
const teacherAuthRoute = require("./Routes/TeacherAuthRoute");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'nonce-1hwfwf2r332hiuh' https://ajax.googleapis.com/ https://cdn.rawgit.com/"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json()); //body-parser

app.use("/exam/draft", examDraftRoute);
app.use("/auth/teacher", teacherAuthRoute);

//post exam //getExam //get draft //delete exam

app.get("/", (req, res, next) => {
  res.send("hello");
});

app.use((req, res, next) => {
  const error = new Error("Invalid Endpoint.");
  error.status = 404;
  throw error;
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({
    status: status,
    message: message,
    info: error.data || null,
  });
});

console.log("Connecting to Database...");
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.i2j6g.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&writeConcern=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then((res) => {
    console.log("Connected to Database!");
    return app.listen(process.env.PORT || 8000);
  })
  .then((res) => {
    console.log("Server Started Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });
