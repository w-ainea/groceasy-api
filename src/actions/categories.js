const db = require("../../db-config");
const { cloudinaryUpload } = require("../middleware/cloudinary.js");
const { dataUri } = require("../middleware/datauri.js");

const getCategories = () => {
  return db("categories");
};

const addCategory = async (image, category) => {
  try {
    const file64 = dataUri(image);
    const uploadResponse = await cloudinaryUpload(file64.content);
    console.log("upload resp", uploadResponse);
    const dbResult = await db("categories").returning("*").insert({
      imgurl: uploadResponse.url,
      name: category.name,
    });

    console.log(dbResult);
    return dbResult;
  } catch (error) {
    throw error;
  }
};

module.exports = { getCategories, addCategory };
