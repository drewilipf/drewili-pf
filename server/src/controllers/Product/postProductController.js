const { Product } = require('../../db');
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'dpj4n40t6',
    api_key: '664465837792261',
    api_secret: 'FfMnHd-2tcwmzo6OZkLTcEePcWA'
})

const postProductsController = async (name, description, price, specifications, stock, image, brand_id, category_id, color_id) => {

    const cloudinaryUpload = await cloudinary.uploader.upload(image)

    const imageUrl = cloudinaryUpload.secure_url

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
    });

    return newProduct;
};

module.exports = postProductsController;
