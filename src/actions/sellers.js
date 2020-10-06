const db = require("../../db-config.js");

const getSellers = () => {
  return db("sellers");
};

const addSeller = (seller) => {
  return db("sellers").returning("*").insert({});
};

const deleteProduct = () => {};

module.exports = { getSellers, addSeller };
