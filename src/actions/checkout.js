const request = require("request");
require("dotenv").config();

const access = (req, res, next) => {
  // access token
  const consumer_key = process.env.API_CONSUMER_KEY;
  const consumer_secret = process.env.API_CONSUMER_SECRET;
  let url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  let auth = new Buffer.from(consumer_key + ":" + consumer_secret).toString(
    "base64"
  );

  request(
    {
      url: url,
      headers: {
        Authorization: "Basic " + auth,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        // let resp =
        req.access_token = JSON.parse(body).access_token;
        next();
      }
    }
  );
};

const authenticateApp = () => {
  const consumer_key = process.env.API_CONSUMER_KEY;
  const consumer_secret = process.env.API_CONSUMER_SECRET;

  url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  auth =
    "Basic " +
    new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

  request(
    {
      url: url,
      headers: {
        Authorization: auth,
      },
    },
    function (err, response, body) {
      // TODO: Use the body object to extract OAuth access token
      if (err) {
        console.log(err);
      }

      let parsedBody = JSON.parse(body);
      return parsedBody;
    }
  );
};

module.exports = { access };
