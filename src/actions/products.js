const db = require("../../db-config.js");

const getProducts = () => {
  return db("products");
};

const getProductById = (id) => {
  return db("products").returning("*").where(id, "product.id");
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
    quantity: product.quantity,
  });
};

const deleteProduct = (id) => {
  return db("products").where(id, "product.id").delete();
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
