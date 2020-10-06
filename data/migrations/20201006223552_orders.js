exports.up = async function (knex) {
  await knex.schema.createTable("ordersTable", (table) => {
    table.increments("id").primary();
    table.json("products").notNullable();
    table.decimal("order_total").notNullable();
    table
      .integer("product_id")
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("cascade");
    table
      .integer("customer_id")
      .notNullable()
      .references("id")
      .inTable("customers")
      .onDelete("cascade");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("orders");
};
