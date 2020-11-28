const { response } = require("express");
const db = require("../../db-config.js");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

const imageUpload = (image, title) => {
  const data = {
    image,
    title,
  };

  cloudinary.uploader
    .upload(data.image)
    .then((image) => {
      return db("images").returning("*").insert({
        title: image.title,
        cloudinary_id: image.public_id,
        img_url: image.secure_url,
      });
    })
    .catch((err) => {
      console.log({ message: "upload failed", err });
    });
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  imageUpload,
};
