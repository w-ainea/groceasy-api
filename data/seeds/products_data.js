exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("products").insert([
        { product_name: "Kale", price: 10, category: "Vegetables" },
        { product_name: "Spinach", price: 20, category: "Vegetables" },
        { product_name: "Tomatoes", price: 5, category: "Fruits" },
        { product_name: "Cashew Nuts", price: 10, category: "Nuts" },
        { product_name: "Avocado", price: 30, category: "Fruits" },
      ]);
    });
};
