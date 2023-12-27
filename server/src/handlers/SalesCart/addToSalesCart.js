const addToSalesCartController = require("../../controllers/SalesCart/addToSalesCart");

const addToSalesCartHandler = async (req, res) => {
  try {
    const { productId } = req.body;
    const userIdFromSession = req.session.userId;

    const userSessionFromCookie = req.cookies.userSession;
    const userIdFromCookie = userSessionFromCookie ? JSON.parse(userSessionFromCookie).userId : null;

    // Verifica si el usuario está autenticado ya sea a través de la sesión o las cookies
    if (userIdFromSession || userIdFromCookie) {
      const userId = userIdFromSession || userIdFromCookie;

      if (!productId) {
        return res.status(400).json({ error: 'Se requiere el campo productId.' });
      }

      const addedCartItem = await addToSalesCartController(productId, userId);

      return res.status(201).json(addedCartItem);
    } else {
      // El usuario no está autenticado
      return res.status(401).json({ error: "Usuario no autenticado" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = addToSalesCartHandler;
