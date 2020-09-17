const express = require("express");

const router = express.Router();

// const { initiatePayment } = require("../actions").checkout;

router.post("/pay", (req, res) => {
  const axios = require("axios"),
    oauth_token = "qH5EbtU6R56lhAQcAh2ZtRtSrFfx",
    url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    auth = "Bearer " + oauth_token;

  axios(
    {
      method: "POST",
      url,
      headers: {
        Authorization: auth,
      },
      json: {
        BusinessShortCode: " ",
        Password: " ",
        Timestamp: " ",
        TransactionType: "CustomerPayBillOnline",
        Amount: " ",
        PartyA: " ",
        PartyB: " ",
        PhoneNumber: " ",
        CallBackURL: "https://ip_address:port/callback",
        AccountReference: " ",
        TransactionDesc: " ",
      },
    },
    function (error, response, body) {
      // TODO: Use the body object to extract the response
      console.log(body);
    }
  );

  // res.send("Payment Initiated");
});

module.exports = router;
