const addToSalesCartController = require("../../controllers/SalesCart/addToSalesCart");

const addToSalesCartHandler = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId) {
      return res.status(400).json({ error: 'Se requieren los campos productId, userId y quantity' });
    }

    const addedCartItem = await addToSalesCartController(productId, userId, quantity);

    res.status(201).json(addedCartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = addToSalesCartHandler;
