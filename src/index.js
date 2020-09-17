const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
const db = require("../db-config");

// constants
const app = express();
const port = 8000;

// console.log(db);

// moddlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// mount routes
app.use(routes);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    console.error("Request without valid token");
    res.status(401).send({ msg: "Invalid token" });
  } else next();
});

app.listen(process.env.PORT || port, () => {
  console.log(`App listening on port: ${process.env.PORT || port}`);
});
