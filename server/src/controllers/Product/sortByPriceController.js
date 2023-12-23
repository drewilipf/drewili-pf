const { Product } = require("../../db");

const sortByPriceController = async (orderDirection = 'ASC') => {
  try {
    const products = await Product.findAll({
      order: [['price', orderDirection.toUpperCase()]], // por default el orden sera ascendente
    });

    return products;
  } catch (error) {
    throw new Error("Error al obtener y ordenar los productos por precio.");
  }
};

module.exports = sortByPriceController;
