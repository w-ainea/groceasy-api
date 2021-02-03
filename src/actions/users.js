const db = require("../../db-config.js");

const getUsers = async () => {
  try {
    const users = await db("users");
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await db("users").where("id", "=", id);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { getUsers, getUserById };
