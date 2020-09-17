exports.up = async function (knex, Promise) {
  await knex.schema.createTable("customers", (table) => {
    table.increments("customer_id").primary();
    table.string("customer_name").notNullable();
  });
};

exports.down = async function (knex, Promise) {
  await knex.dropTable("customers");
};
