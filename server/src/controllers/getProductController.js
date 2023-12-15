const { Product } = require('../db');

const getProductsController = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = getProductsController;
