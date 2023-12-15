const getProductsController = require('../controllers/getProductController');

const getProductsHandler = async (req, res) => {
    try {
        const data = {}; 

        await getProductsController(data, res);
        
    } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = getProductsHandler;
