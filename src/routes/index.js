const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("App is up and running");
});

app.use("/categories", require("./categories"));
app.use("/account", require("./account"));
app.use("/checkout", require("./checkout"));
app.use("/products", require("./products"));
app.use("/sellers", require("./sellers"));
app.use("/auth", require("./auth"));
app.use("/orders", require("./orders"));

app.all("*", (req, res) => {
  res.status(400).send({ message: "not found" });
});

module.exports = app;