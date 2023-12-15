const postProductsController = require("../controllers/postProductController");

const postProductsHandler = async (req, res) => {
    try {
        const { name, description, price, specifications, stock, brand_id, category_id } = req.body;

        await postProductsController({ name, description, price, specifications, stock, brand_id, category_id }, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = postProductsHandler;
