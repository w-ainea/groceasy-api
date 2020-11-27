const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");
require("dotenv").config();

const app = express();
const port = process.env.API_PORT || 8000;
const appOrigin = process.env.APP_ORIGIN;

// moddlewares
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(jsonParser);
app.use(urlencodedParser);

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
