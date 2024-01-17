const addToSalesCartController = require("../../controllers/SalesCart/addToSalesCart");

const addToSalesCartHandler = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;
    
    const addedCartItem = await addToSalesCartController(productId, userId, quantity);

    return res.status(201).json(addedCartItem);
  } catch (error) {
    
    return res.status(500).json({ error: error.message });
  }
};

module.exports = addToSalesCartHandler;
