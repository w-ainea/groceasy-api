const express = require("express");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

const {
  getProducts,
  addProduct,
  updateProduct,
} = require("../actions/products.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("products endpoint");
});

// get the products
router.get("/list", (req, res, next) => {
  return getProducts()
    .then((products) => res.json(products))
    .catch((err) => next(err));
});

// add products
router.post("/add", jsonParser, (req, res, next) => {
  addProduct(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      next(err);
    });
});

// update products
router.put("/update", (req, res, next) => {
  updateProduct(req.body)
    .then((product) => res.json({ product }))
    .catch((err) => next(err));
});

module.exports = router;
