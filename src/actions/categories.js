const db = require("../../db-config");

const getCategories = () => {
  return db("categories");
};

const addCategory = (category) => {
  return db("categories").returning("*").insert({
    category_name: category.category_name,
  });
};

module.exports = { getCategories, addCategory };
