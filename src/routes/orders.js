const express = require("express");

const router = express.Router();

const { getOrders, addOrder } = require("../actions/orders");

// retrieve orders
router.get("/", (req, res) => {
  res.send("Orders endpoint");
});

router.get("/list", (req, res, next) => {
  return getOrders()
    .then((orders) => res.json(orders))
    .catch((err) => next(err));
});

// add order
router.post("/add", (req, res) => {

  console.log(req.body)
  // addOrder(req.body)
  //   .then((response) => {
  //     response.json();
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     throw err;
  //   });
});

// cancel Order

// export router
module.exports = router;