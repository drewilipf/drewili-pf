const sortProductsByRatingController = require('../../controllers/Product/sortByRatingController');

const sortProductsByRatingHandler = async (req, res) => {
  try {
    const productsByRating = await sortProductsByRatingController();
    res.status(200).json(productsByRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = sortProductsByRatingHandler;
