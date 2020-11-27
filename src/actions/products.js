const db = require("../../db-config.js");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

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

const imageUpload = (image) => {
  const data = {
    image,
  };

  console.log(data);

  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });

  console.log("working");
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  imageUpload,
};
