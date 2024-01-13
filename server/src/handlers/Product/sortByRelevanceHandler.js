const sortProductsByRelevanceController = require('../../controllers/Product/sortByRelevanceController');

const sortProductsByRelevanceHandler = async (req, res) => {
    try {
        const productsSortedByRelevance = await sortProductsByRelevanceController();
        res.status(200).json(productsSortedByRelevance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = sortProductsByRelevanceHandler;
