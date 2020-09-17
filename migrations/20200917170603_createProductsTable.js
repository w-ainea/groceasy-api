exports.up = async function (knex, Promise) {
  await knex.schema.createTable("products", (table) => {
    table.increments("product_id").primary();
    table.string("product_name", 20).notNullable();
    table.decimal("price").notNullable();
    table.string("category", 50).notNullable();
    table.decimal("seller_id").notNullable();
  });
};

exports.down = async function (knex, Promise) {
  await knex.schema.dropTable("products");
};
