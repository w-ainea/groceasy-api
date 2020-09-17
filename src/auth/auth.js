const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

// constants
const app = express();
const authConfig = {
  issuer: "https://dev-66wkr248.us.auth0.com",
  audience: "https://dev-66wkr248.us.auth0.com/api/v2/",
  algorithms: ["RS256"],
};

const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${authConfig.issuer}.well-known/jwks.json`,
});

const authenticated = jwt({ secret, ...authConfig });

module.exports = authenticated;
