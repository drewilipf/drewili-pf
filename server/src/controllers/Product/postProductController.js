require('dotenv').config();
const { Product } = require('../../db');
const cloudinary = require('cloudinary');
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const postProductsController = async (name, description, price, specifications, stock, image, brand_id, category_id, color_id, relevance) => {
  try {
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

    return newProduct;
  } catch (error) {
    console.error('Error al cargar la imagen con Cloudinary:', error);
    throw error; // Propaga el error para que se maneje en el controlador principal
  }
};

module.exports = postProductsController;
