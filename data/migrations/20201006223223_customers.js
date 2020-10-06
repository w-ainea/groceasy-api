exports.up = async function (knex) {
  await knex.schema.createTable("customers", (table) => {
    table.increments("id").primary();
    table.string("customer_name").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("customers");
};
