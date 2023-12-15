const postProductsController = require("../controllers/postProductController")

const postProductsHandler = async (req, res) => {
    try {
        await postProductsController(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = postProductsHandler;
