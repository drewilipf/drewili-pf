const postProductsController = require("../../controllers/Product/postProductController");

const postProductsHandler = async (req, res) => {
    try {
        const { name, description, price, specifications, stock, image, brand_id, category_id } = req.body;

        await postProductsController(name, description, price, specifications, stock, image, brand_id, category_id);

        res.status(200).send("Producto creado con éxito")

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = postProductsHandler;
