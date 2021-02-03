const db = require("../../db-config.js");
const { cloudinaryUpload } = require("../middleware/cloudinary.js");
const { dataUri } = require("../middleware/datauri.js");
const { getUserById } = require("./users");

const getProducts = () => {
  return db("products");
};

const getProductById = async (id) => {
  try {
    let res = await db("products").returning("*").where("id", "=", id);
    return res[0];
  } catch (error) {
    console.log(error);
  }
  return db("products").returning("*").where("id", "=", id);
};

// upload the product image
const imageUpload = async (image) => {
  try {
    const file64 = dataUri(image);
    const uploadResponse = await cloudinaryUpload(file64.content);
    const dbResult = await db("images").returning("*").insert({
      title: uploadResponse.public_id,
      cloudinary_id: uploadResponse.secure_url,
      img_url: uploadResponse.url,
    });

    return dbResult;
  } catch (error) {
    console.log(error);
  }
};

const addProductToUser = async (id) => {
  const user = await getUserById(id);
  const newUser = await user.increment("products", 1);
  console.log(newUser);
  return newUser;
};

// add product to the database
const addProduct = async (image, product) => {
  const file64 = dataUri(image);
  const uploadResponse = await cloudinaryUpload(file64.content);

  const updateUser = await db("users")
    .select("*")
    .where("id", product.user_id)
    .increment("products", 1);

  db.transaction((trx) => {
    trx
      .insert({
        image_url: uploadResponse.url,
      })
      .into("images")
      .returning("image_url")
      .then((imgurl) => {
        return db("products").returning("*").insert({
          imgurl: imgurl[0],
          product_name: product.name,
          price: product.price,
          category: product.category,
          quantity: product.quantity,
          user_id: product.user_id,
        });
      })
      .then(trx.commit)
      .catch(trx.catch);
  }).catch((err) => console.log(err));
};

const updateProduct = (product) => {
  return db("products").update({
    product_name: product.product_name,
    price: product.price,
    category: product.category,
    quantity: product.quantity,
  });
};

const deleteProduct = async (id) => {
  try {
    const product = await db("products").where("id", id).del();
    await db("users")
      .select("*")
      .where("id", "=", product.user_id)
      .decrement(products, 1);

    if (product) {
      let db = await getProducts();
      return db;
    } else {
      let response = "could not delete product";
      return response;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  imageUpload,
};
