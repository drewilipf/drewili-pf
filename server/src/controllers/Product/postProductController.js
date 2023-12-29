require("dotenv").config();
const { Product } = require("../../db");
const cloudinary = require("cloudinary");
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
});

const postProductsController = async (
  name,
  description,
  price,
  specifications,
  stock,
  image,
  brand_id,
  category_id,
  color_id,
  relevance
) => {
  const cloudinaryUpload = await cloudinary.uploader.upload(image);

  const imageUrl = cloudinaryUpload.secure_url;

  const newProduct = await Product.create({
    name,
    description,
    price,
    specifications,
    stock,
    image: imageUrl,
    color_id,
    brand_id,
    category_id,
    relevance,
  });
  console.log(newProduct);

  return newProduct;
};

module.exports = postProductsController;
