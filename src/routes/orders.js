const express = require("express");

const router = express.Router();

const { getOrders, addOrder } = require("../actions/orders");

// retrieve orders
router.get("/", (req, res) => {
  res.send("Orders endpoint");
});

// add order
router.post("/add", (req, res) => {
  addOrder(req.body)
    .then((response) => {
      response.json();
      console.log(response);
    })
    .catch((err) => {
      throw err;
    });
});

// cancel Order

// export router
module.exports = router;