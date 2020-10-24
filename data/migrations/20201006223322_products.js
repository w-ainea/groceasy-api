exports.up = async function (knex) {
  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("product_name").notNullable();
    table.decimal("price", { precision: 0 }).notNullable();
    table.string("category").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("products");
};
