const { SalesCart } = require("../../db");

const addToSalesCartController = async (productId, userId, quantity) => {
  try {
    const salesCartItem = await SalesCart.create({
      product_id: productId,
      user_id: userId,
      quantity: quantity
    });

    return salesCartItem;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = addToSalesCartController;
