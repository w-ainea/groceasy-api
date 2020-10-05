const db = require("../../db-config.js");

const getProducts = () => {
  return db("products");
};

const updateProducts = () => {};

const deleteProducts = () => {};

module.exports = { getProducts, updateProducts, deleteProducts };
