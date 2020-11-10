const db = require("../../db-config.js");

const getOrders = () => {
  return db("orders");
};

const addOrder = (order) => {
  // return db("orders").returning("*").insert({
  //   products: order.products,
  //   order_total: order.order_total,
  // });

  console.log('order added')
};

module.exports = { getOrders, addOrder };
