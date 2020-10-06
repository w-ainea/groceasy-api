exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("sellers")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("sellers").insert([
        { seller_name: "Gladys" },
        { seller_name: "Irene" },
        { seller_name: "Jane" },
        { seller_name: "Molly" },
      ]);
    });
};
