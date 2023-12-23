const sortByPriceController = require("../../controllers/Product/sortByPriceController");

const sortByPriceHandler = async (req, res) => {
  try {
    const orderDirection = req.query.order === 'DESC' ? 'DESC' : 'ASC';

    const sortedProducts = await sortByPriceController(orderDirection);

    res.status(200).json(sortedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = sortByPriceHandler;
