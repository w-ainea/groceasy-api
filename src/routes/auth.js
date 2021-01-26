const express = require("express");
const {
  signIn,
  signUp,
  signInAuthentication,
  getUserById,
} = require("../actions/auth");

const router = express.Router();

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "unable to retrieve user" });
  }
});

// signup a user
router.post("/signup", async (req, res) => {
  const response = await signUp(req.body);
  res.json({ response });
});

router.post("/signin", async (req, res) => {
  const { authorization } = req.headers;
  const response = await signInAuthentication(req.body, authorization);

  res.json({ response });
});

module.exports = router;
