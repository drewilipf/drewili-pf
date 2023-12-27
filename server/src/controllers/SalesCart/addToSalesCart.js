const { SalesCart } = require("../../db");

const addToSalesCartController = async (productId, userId) => {
  try {
    const salesCartItem = await SalesCart.create({
      product_id: productId,
      user_id: userId,
      quantity: 1, // AJUSTAR
    });

    return salesCartItem;
  } catch (error) {
    throw new Error("Error al agregar el producto al carrito de ventas.");
  }
};

module.exports = addToSalesCartController;
