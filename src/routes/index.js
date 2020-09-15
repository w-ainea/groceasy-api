const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("App is up and running");
});

app.use("/auth", require("./auth"));
app.use("/admin", require("./dashboard"));

module.exports = app;
