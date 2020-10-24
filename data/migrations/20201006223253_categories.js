exports.up = async function (knex) {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("categories");
};
