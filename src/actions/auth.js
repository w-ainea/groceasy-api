const express = require("express");
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

const audience = process.env.AUTH0_AUDIENCE;
const issuer = process.env.AUTH0_ISSUER;

//Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuer}.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: audience,
  issuer: issuer,
  algorithms: ["RS256"],
});

const checkSCopes = jwtAuthz(["read:messages"]);

(module.exports = checkJwt), checkSCopes;
