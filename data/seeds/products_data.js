exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("products").insert([
        {
          product_name: "Kale",
          price: 20,
          category: "vegetables",
          seller_id: 1,
        },
        {
          product_name: "Brocolli",
          price: 30,
          category: "vegetables",
          seller_id: 2,
        },
        {
          product_name: "Oranges",
          price: 10,
          category: "fruits",
          seller_id: 3,
        },
      ]);
    });
};
