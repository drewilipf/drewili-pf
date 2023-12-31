const getProductsController = require('../../controllers/Product/getProductController');

const getProductsHandler = async (req, res) => {
    try {
       const products = await getProductsController();
       
        res.status(200).json(products)
    } catch (error) {
        
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = getProductsHandler;
