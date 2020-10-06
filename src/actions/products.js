const db = require("../../db-config.js");

const getProducts = () => {
  return db("products");
};

const addProduct = (product) => {
  return db("products").returning("*").insert({
    product_name: product.product_name,
    price: product.price,
    category: product.category,
    seller_id: product.seller_id,
  });
};

const updateProduct = (product) => {
  return db("products").update({
    product_name: product.product_name,
    price: product.price,
    category: product.category,
    seller_id: product.seller_id,
  });
};

const deleteProduct = () => {};

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };
