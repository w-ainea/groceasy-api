const db = require("../../db-config");

const getCategories = () => {
  return db("categories");
};

const addCategory = (category) => {
  return db("categories").returning("*").insert({
    name: category.name,
  });
};

module.exports = { getCategories, addCategory };
