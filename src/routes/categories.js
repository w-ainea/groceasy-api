const express = require("express");
const { getCategories, addCategory } = require("../actions/categories");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("categories");
});

router.get("/list", (req, res, next) => {
  return getCategories()
    .then((category) => res.json(category))
    .catch((err) => next(err));
});

router.post("/add", (req, res, next) => {
  addCategory(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
