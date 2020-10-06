const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
const jwtCheck = require("./actions/auth");
require("dotenv").config();

const app = express();
const port = process.env.API_PORT;
const appOrigin = process.env.APP_ORIGIN;

// moddlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: appOrigin }));

// mount routes
app.use(routes);
// app.use(jwtCheck);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    console.error("Request without valid token");
    res.status(401).send({ msg: "Invalid token" });
  } else next();
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
