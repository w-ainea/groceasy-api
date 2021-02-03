const express = require("express");
const { getUsers, getUserById } = require("../actions/users");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
