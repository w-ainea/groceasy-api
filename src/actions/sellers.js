const db = require("../../db-config.js");

const getSellers = () => {
  return db("sellers");
};

const addSeller = (seller) => {
  return db("sellers").returning("*").insert({
    seller_name: seller.seller_name,
  });
};

const getSellerById = (id) => {
  return db("sellers").where({ id }).select("*");
};

module.exports = { getSellers, addSeller, getSellerById };
