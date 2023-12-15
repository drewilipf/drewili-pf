const { Product } = require('../db');

const postProductsController = async (data, res) => {
    const { name, description, price, specifications, stock, brand_id, category_id } = data;

    const newProduct = await Product.create({
        name,
        description,
        price,
        specifications,
        stock,
        brand_id,
        category_id,
    });

    res.status(200).json(newProduct);
};

module.exports = postProductsController;
