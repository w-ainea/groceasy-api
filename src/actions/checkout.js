// const crypto = require("crypto");
// const constants = require("constants");

// const ConsumerKey = "dpqiNZdOSJ4shSd8ex5WhoP2JixgcMJ2";
// const ConsumerSecret = "Hll6fPJDnF3nRx4m";
// const url =
//   "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

// const authenticateApp = () => {
//   const auth = `Basic ${new Buffer.from(
//     `${ConsumerKey}:${ConsumerSecret}`
//   ).toString("base64")}`;

//   axios.get(
//     {
//       url,
//       headers: {
//         Authorization: auth,
//       },
//     },
//     (error, response, body) => {
//       // TODO: Use the body object to extract OAuth access token

//       // response.send("working");
//       console.log(body);
//     }
//   );
// };

// const encryptInitiatorPassword = () => {
//   let privatekey = "PATH_TO_CERTIFICATE_FILE";
//   let bufferToEncrypt = new Buffer.from("abc");

//   let encrypted = crypto.publicEncrypt(
//     { key: privatekey, padding: constants.RSA_PKCS1_PADDING },
//     bufferToEncrypt
//   );

//   console.log(encrypted.toString("base64"));

//   null;
// };

// };

// module.exports = { authenticateApp, encryptInitiatorPassword, initiatePayment };
