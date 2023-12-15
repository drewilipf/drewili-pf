const { Product } = require('../db');

const getProductsController = async (data, res) => {
    const products = await Product.findAll();

    res.status(200).json(products);
};

module.exports = getProductsController;
