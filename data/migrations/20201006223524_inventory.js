exports.up = async function (knex) {
  await knex.schema.createTable("inventory", (table) => {
    table.increments("id").primary();
    table.string("product_name").notNullable();
    table
      .integer("product_id")
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("cascade");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("inventory");
};
