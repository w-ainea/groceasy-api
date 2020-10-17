const express = require("express");

const request = require("request");
require("dotenv").config();

const router = express.Router();

const { access } = require("../actions/checkout");

router.get("/stk", access, (req, res, next) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    auth = "Bearer " + req.access_token,
    date = new Date(),
    timestamp =
      date.getFullYear() +
      "" +
      "0" +
      date.getMonth() +
      "" +
      "" +
      date.getDate() +
      "" +
      "0" +
      date.getHours() +
      "" +
      "" +
      date.getMinutes() +
      "" +
      "" +
      date.getSeconds();

  const password = new Buffer.from(
    "174379" +
      "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" +
      timestamp
  ).toString("base64");

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
        Amount: "1",
        PartyA: "254715390163",
        PartyB: "174379",
        PhoneNumber: "254715390163",
        CallBackURL: "https://192.168.0.107:8000/checkout/pay",
        AccountReference: "Test",
        TransactionDesc: "TestPay",
      },
    },
    function (error, response, body) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json(body);
      }
    }
  );
});

router.post("/pay", (req, res) => {
  console.log("-------STK-------");
  console.log(body);
});

module.exports = router;
