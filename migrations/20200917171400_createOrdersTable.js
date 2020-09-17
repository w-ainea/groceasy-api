exports.up = async function (knex, Promise) {
  await knex.schema.createTable("orders", (table) => {
    table.increments("order_id").primary();
    table.json("products").notNullable();
    table.decimal("order_total").notNullable();
    table.decimal("customer_id").notNullable();
  });
};

exports.down = async function (knex, Promise) {
  await knex.dropTable("orders");
};
