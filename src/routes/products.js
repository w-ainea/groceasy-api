const express = require("express");
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

const db = require("../../db-config.js");

const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  imageUpload,
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

// add products
router.post("/add", jsonParser, (req, res, next) => {
  return addProduct(req.body)
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

router.delete("/delete", (req, res, next) => {
  const { id } = req.body.product.id;
  return getProductById(id).then((product) => {
    if (product) {
      console.log(product);
      deleteProduct(product)
        .then(() => res.json({ msg: "product deleted successfully" }))
        .catch((err) => {
          // res.status(400).json("Could not delete product");
          console.log(err);
        });
    } else {
      res.status(404).send({ message: "product not found" });
    }
  });
});

router.post("/image-upload", (req, res) => {
  const { image } = req.body;

  return imageUpload(image)
    .then((result) => {
      res.status(201).send({
        status: "success",
        data: {
          message: "Image uploaded successfully",
          title: result.title,
          cloudinary_id: result.cloudinary_id,
          img_url: result.image_url,
        },
      });
    })
    .catch((err) => {
      res.status(500).send("upload failed", err);
    });
});

module.exports = router;
