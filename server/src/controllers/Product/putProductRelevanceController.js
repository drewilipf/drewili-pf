const { Product } = require("../../db");

const updateRelevanceController = async (productId, newRelevance) => {
  try {
    if (newRelevance < 0 || newRelevance > 2) {
      throw new Error("La relevancia debe estar entre 0 y 2");
    }

    
    const updatedProduct = await Product.update(
      { relevance: newRelevance },
      {
        where: { id: productId },
        returning: true,
        plain: true,
      }
    );

    return updatedProduct[1]; 
  } catch (error) {
    throw new Error(`Error al actualizar la relevancia: ${error.message}`);
  }
};

module.exports = updateRelevanceController;
