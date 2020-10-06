const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("App is up and running");
});

app.use("/admin", require("./dashboard"));
app.use("/account", require("./account"));
app.use("/checkout", require("./checkout"));
app.use("/products", require("./products"));
app.use("/sellers", require("./sellers"));
app.use("/auth", require("./auth"));

app.all("*", (req, res) => {
  res.status(400).send({ message: "not found" });
});

module.exports = app;
