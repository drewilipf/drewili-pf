const { Comments } = require("../../db");

const sortProductsByRatingController = async () => {
  try {
    const productsByRating = await Comments.findAll({
      order: [['rating', 'DESC']], // Ordenar por rating de mayor a menor
    });

    return productsByRating;
  } catch (error) {
    throw new Error(`Error al ordenar por rating: ${error.message}`);
  }
};

module.exports = sortProductsByRatingController;
