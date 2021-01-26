const express = require("express");
const { signIn, signUp } = require("../actions/auth");

const router = express.Router();

// signup a user
router.post("/signup", async (req, res) => {
  const response = await signUp(req.body);
  // console.log(response);
  res.json({ response });
});

router.post("/signin", async (req, res) => {
  const response = await signIn(req.body);
  console.log(response);
  res.json({ response });
});

module.exports = router;
