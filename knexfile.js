// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "groceasy-db",
      user: "ainea",
      password: "5432",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: __dirname + "/migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "groceasy-db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
