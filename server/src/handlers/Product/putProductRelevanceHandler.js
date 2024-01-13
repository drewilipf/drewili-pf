const updateRelevanceController = require('../../controllers/Product/putProductRelevanceController');

const updateRelevanceHandler = async (req, res) => {
  try {
    const { productId } = req.params;
    const { newRelevance } = req.body;

    const updatedProduct = await updateRelevanceController(productId, newRelevance);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateRelevanceHandler;
