const express = require("express");
const { auth } = require("express-openid-connect");

const request = require("request");
require("dotenv").config();

const router = express.Router();

const authenticate = (req, res, next) => {
  const consumer_key = process.env.API_CONSUMER_KEY;
  const consumer_secret = process.env.API_CONSUMER_SECRET;
  let url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  let auth =
    "Basic " +
    new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  request(
    {
      url,
      headers: {
        Authorization: "Basic" + auth,
      },
    },
    (error, response, body) => {
      // TODO: Use the body object to extract OAuth access token
      if (error) {
        res.send(error);
      } else {
        req.access_token = JSON.parse(body).access_token;

        next;
      }

      res.status(200).json(body);
    }
  );
};

router.get("/stk", authenticate, (req, res) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    auth = "Bearer " + req.access_token,
    date = new Date(),
    timestamp =
      date.getFullYear() +
      "" +
      "" +
      date.getMonth() +
      "" +
      "" +
      date.getDate() +
      "" +
      "" +
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
        CallBackURL: " https://192.168.0.107:8000/checkout/pay",
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

router.get("/auth", authenticate, (req, res) => {
  res.status(200).json({ access_token: req.access_token });
});

router.post("/pay", (req, res) => {
  console.log("-------STK-------");
  console.log(body);
});

module.exports = router;
