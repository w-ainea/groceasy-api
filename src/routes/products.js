const express = require("express");
const multer = require("multer");

const db = require("../../db-config.js");
const upload = multer();

const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../actions/products.js");

const router = express.Router();

router.get("/", (req, res) => {
  return db("products").then((data) => res.json(data));
});

// get the products
router.get("/list", (req, res, next) => {
  return getProducts()
    .then((products) => res.json(products))
    .catch((err) => next(err));
});

router.get("/list/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let response = await getProductById(id);
    res.json({ response });
  } catch (error) {
    res.status(400).json({ error, message: "couldn't retrieve item" });
  }
});

// add products
router.post("/add", upload.single("image"), (req, res, next) => {
  console.log(req.body);
  return addProduct(req.file, req.body)
    .then((result) => res.json({ result }))
    .catch((err) =>
      res.status(400).json({ err, message: "unable to add product" })
    );
});

// update products
router.put("/update", (req, res, next) => {
  updateProduct(req.body)
    .then((product) => res.json({ product }))
    .catch((err) => next(err));
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let deleteResponse = await deleteProduct(id);
    console.log(deleteResponse);
    res.send(deleteResponse);
  } catch (error) {
    res.status(400).json({ error, message: "could not delete product" });
  }
});

module.exports = router;
