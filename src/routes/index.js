const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("App is up and running");
});

app.use("/admin", require("./dashboard"));
app.use("/account", require("./account"));
app.use("/checkout", require("./checkout"));
app.use("/products", require("./products"));
app.use("/auth", require("./auth"));

module.exports = app;
