const knex = require("knex");
require("dotenv").config();

const config = knex({
  client: "postgresql",
  connection: process.env.POSTGRES_URI,
});

module.exports = config;
