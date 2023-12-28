const { sortProductDateController } = require('../../controllers/Product/sortDateController'); 


const sortProductsDateHandler = async (req, res) => {
    try {
        const { sortBy } = req.query;
        const products = await sortProductDateController(sortBy);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = sortProductsDateHandler;
