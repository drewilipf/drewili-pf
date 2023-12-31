const sortByPriceController = require("../../controllers/Product/sortByPriceController");

const sortByPriceHandler = async (req, res) => {
  try {
    const {order} = req.query;

    const sortedProducts = await sortByPriceController(order);

    res.status(200).json(sortedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = sortByPriceHandler;
