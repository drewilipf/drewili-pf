require("dotenv").config();
const { Product } = require("../../db");
const cloudinary = require("cloudinary");
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
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

  const uploadImages = image.map(async (img) => {
    const cloudinaryUpload = await cloudinary.uploader.upload(img);
    return cloudinaryUpload.secure_url;
  });
  
  const imagesUrls = await Promise.all(uploadImages);
  console.log(imagesUrls, 'este es el array');

  const newProduct = await Product.create({
    name,
    description,
    price,
    specifications,
    stock,
    imageArray: imagesUrls,
    color_id,
    brand_id,
    category_id,
    relevance,
  });

  return newProduct;
};

module.exports = postProductsController;
