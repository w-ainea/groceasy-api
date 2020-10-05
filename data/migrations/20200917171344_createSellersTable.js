exports.up = async function (knex, Promise) {
  return Promise.all([
    await knex.schema.createTable("sellers", (table) => {
      table.increments("seller_id").primary();
      table.string("seller_name", 50).notNullable();
    }),
  ]);
};

exports.down = async function (knex, Promise) {
  return Promise.all([await knex.schema.dropTable("sellers")]);
};
