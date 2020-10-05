const express = require("express");
const db = require("../../db-config.js");
const { getProducts } = require("../actions/products.js");

const router = express.Router();

router.get("/list", (req, res) => {
  return getProducts()
    .then((products) => res.json(products))
    .catch((err) => console.log(err));
  // res.send("products endpoint");
});

router.post("/products", (req, res) => {});

module.exports = router;
