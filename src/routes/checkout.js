const express = require("express");

const request = require("request");
require("dotenv").config();

const router = express.Router();

const { authenticate } = require("../actions/checkout");

const formatedDate = (n) => {
  return n < 10 ? "0" + n : n;
};

// initiate an STK push to the customer's phone
router.post("/stk", authenticate, (req, res, next) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    auth = "Bearer " + req.access_token,
    date = new Date(),
    timestamp =
      date.getFullYear() +
      formatedDate(date.getMonth() + 1) +
      formatedDate(date.getDate()) +
      formatedDate(date.getHours()) +
      formatedDate(date.getMinutes()) +
      formatedDate(date.getSeconds());

  const password = new Buffer.from(
    "174379" +
      "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
      timestamp
  ).toString("base64");

  // the actual request sent to Safaricon servers in order to authorize payment
  request(
    {
      url: url,
      method: "POST",
      headers: {
        Authorization: auth,
      },
      json: {
        BusinessShortCode: "174379",
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: req.body.Amount,
        PartyA: req.body.PartyA,
        PartyB: "174379",
        PhoneNumber: req.body.PhoneNumber,
        CallBackURL: "https://192.168.0.107:8000/checkout/",
        AccountReference: "Test",
        TransactionDesc: "TestPay",
      },
    },

    // this callback function runs once the request is complete
    function (error, response, body) {
      // throw an error, if therethe request fails
      if (error) {
        console.log(error);
      } else {
        // otherwise return a success message if the request is successful
        res.status(200).json(body);
        console.log(body);
        return body.CustomerMessage;
      }
    }
  );
});

module.exports = router;
