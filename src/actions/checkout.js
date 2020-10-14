const crypto = require("crypto");
const constants = require("constants");
const request = require("request");
require("dotenv").config();

const consumer_key = process.env.API_CONSUMER_KEY;
const consumer_secret = process.env.API_CONSUMER_SECRET;

// module.exports = { authenticateApp };
