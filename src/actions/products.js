const db = require("../../db-config.js");

const getProducts = () => {
  return db("products");
};

const addProduct = (product) => {
  return db("products").returning("*").insert({
    product_name: product.product_name,
    price: product.price,
    category: product.category,
  });
};

const updateProduct = (product) => {
  return db("products").update({
    product_name: product.product_name,
    price: product.price,
    category: product.category,
    quantity: product.quantity
  });
};

const deleteProduct = () => {};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };