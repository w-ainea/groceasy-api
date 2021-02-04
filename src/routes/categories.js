const express = require("express");
const multer = require("multer");
const { getCategories, addCategory } = require("../actions/categories");

const router = express.Router();
const upload = multer();

router.get("/", (req, res) => {
  res.send("categories");
});

router.get("/list", (req, res, next) => {
  return getCategories()
    .then((category) => res.json(category))
    .catch((err) => next(err));
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
