const express = require("express");
const { orWhereNotExists } = require("../../db-config");

const { getSellers, addSeller, getSellerById } = require("../actions/sellers");

const router = express.Router();

// get a list of sellers
router.get("/list", (req, res) => {
  return getSellers()
    .then((sellers) => res.json(sellers))
    .catch(function (err) {
      res.send(err);
    });
});

// get a seller by id
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  return getSellerById(id)
    .then((response) => res.send(response))
    .catch((err) => next(err));
});

// add a seller
router.post("/add", (req, res) => {
  return addSeller(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.send(err));
});

module.exports = router;
