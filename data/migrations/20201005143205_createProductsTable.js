exports.up = async function (knex, Promise) {
  await knex.schema.createTable("products", (table) => {
    table.increments("product_id").primary();
    table.string("product_name", 20).notNullable();
    table.decimal("price", { precision: 0 }).notNullable();
    table.string("category", 50).notNullable();
    table.integer("seller_id").notNullable();
  });
};

exports.down = async function (knex, Promise) {
  await knex.schema.dropTable("products");
};
