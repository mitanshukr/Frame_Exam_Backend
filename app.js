const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send("hello");
});

app.get("/hello", (req, res, next) => {
    res.send("hello Mitanshu Node");
  });

app.listen(8000, () => {
  console.log("Server Started...");
});
