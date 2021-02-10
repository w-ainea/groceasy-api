const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
require("dotenv").config();

const app = express();
const port = process.env.API_PORT || 8000;
const appOrigin = process.env.APP_ORIGIN;

// middlewares
app.use(morgan("combined"));

app.use(express.json());

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

// listen
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
