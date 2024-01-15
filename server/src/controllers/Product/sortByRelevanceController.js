const { Product } = require("../../db");

const sortProductsByRelevanceController = async () => {
  try {
    const productsSortedByRelevance = await Product.findAll({
      order: [["relevance", "DESC"]],
    });

    return productsSortedByRelevance;
  } catch (error) {
    throw new Error("Error al ordenar los productos por relevancia: " + error.message);
  }
};

module.exports = sortProductsByRelevanceController;
