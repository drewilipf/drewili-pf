const addToSalesCartController = require("../../controllers/SalesCart/addToSalesCart");

const addToSalesCartHandler = async (req, res) => {
  try {
    const sessionUserId = req.session.userId;
    console.log("sesion de usuario:", userId);

    if (!sessionUserId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Se requieren los campos productId y quantity' });
    }

    const addedCartItem = await addToSalesCartController(sessionUserId, productId, quantity);

    res.status(201).json(addedCartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = addToSalesCartHandler;
