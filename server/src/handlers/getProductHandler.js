const getProductsController = require('../controllers/getProductController');

const getProductsHandler = async (req, res) => {
    try {
       const products = await getProductsController();
       console.log(products);
        res.status(200).json(products)
    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = getProductsHandler;
