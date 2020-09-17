const express = require("express");
const db = require("../../db-config.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await db;
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "problem getting products" });
  }
});

module.exports = router;
