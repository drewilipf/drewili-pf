const createNewFavorite = require("../../controllers/Favorites/postFavoriteController");


const postFavoriteHandler = async (req, res) => {
  const { product_id, user_id } = req.body;
  try {
    await createNewFavorite(product_id, user_id);
    return res.status(200).json({ message: 'Creado exitosamente' })
  } catch (error) {
    return res.status(400).send("Ha ocurrido un error");
  }
}

module.exports = postFavoriteHandler;