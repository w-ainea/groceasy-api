const express = require("express");
const multer = require("multer");
const { getCategories, addCategory } = require("../actions/categories");

const router = express.Router();
const upload = multer();

router.get("/", (req, res) => {
  res.send("categories");
});

// endpoint for getting the list of products
router.get("/list", async (req, res, next) => {
  try {
    // make an asynchronous call to the database to fetch the products and send them to the server
    const categories = await getCategories();
    res.json({ categories });
  } catch (error) {
    // in case there's an error, respond with the error
    res.status(400).json({ err });
    next(err);
  }
});

router.post("/add", upload.single("image"), (req, res, next) => {
  addCategory(req.file, req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
