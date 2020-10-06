exports.up = async function (knex) {
  await knex.schema.createTable("sellers", (table) => {
    table.increments("id").primary();
    table.string("seller_name", 50).notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("sellers");
};
