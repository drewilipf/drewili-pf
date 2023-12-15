const { Product } = require('../db'); 

const postProductsController = async (req, res) => {
    try {
        const { name, description, price, specifications, stock, brand_id, category_id } = req.body;

        const newProduct = await Product.create({
            name,
            description,
            price,
            specifications,
            stock,
            brand_id,
            category_id,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = postProductsController;
