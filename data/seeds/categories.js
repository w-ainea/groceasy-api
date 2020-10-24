exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("categories")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("categories").insert([
        { name: "Vegetables" },
        { name: "Fruits" },
        { name: "Nuts" },
        { name: "Cereals" },
        { name: "Spices" },
        { name: "Other" },
      ]);
    });
};
