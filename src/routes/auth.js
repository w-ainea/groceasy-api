const express = require("express");
const checkJwt = require("../actions/auth");
const checkScopes = require("../actions/auth");

const router = express.Router();

router.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to access this endpoint",
  });
});

router.get("/api/private", checkJwt, function (req, res) {
  res.json({
    message: "Hello from a private endpoint! You need authentication",
  });
});

router.get("/api/private-scoped", checkJwt, checkScopes, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
  });
});

/* router.post("/", (req, res) => {
  res.send("Home page");
});

router.post("/register", (req, res) => {
  console.log(req.body);
  res.send("Register");
});

router.post("/login", (req, res) => {
  res.send("Login");
}); */

module.exports = router;
