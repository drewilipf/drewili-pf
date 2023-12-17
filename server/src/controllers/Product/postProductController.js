const { Product } = require('../../db');

const postProductsController = async (name, description, price, specifications, stock, image, brand_id, category_id) => {

    const newProduct = await Product.create({
        name,
        description,
        price,
        specifications,
        stock,
        image,
        brand_id,
        category_id,
    });

    return newProduct;
};

module.exports = postProductsController;
