const knex = require("knex");

const config = knex({
  client: "postgresql",
  connection: {
    database: "groceasy",
    user: "postgres",
    password: "5432",
  },
});

module.exports = config;
