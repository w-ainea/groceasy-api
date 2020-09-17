exports.up = async function (knex, Promise) {
  await knex.schema.createTable("categories", (table) => {
    table.increments("category_id").primary();
    table.string("category_name", 20).notNullable();
  });
};

exports.down = async function (knex, Promise) {
  await knex.schema.dropTable("categories");
};
