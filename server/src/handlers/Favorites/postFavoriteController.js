const createNewFavorite = require("../../controllers/Favorites/postFavoriteController");


const postFavoriteHandler = async (req, res) => {
  const { favorite } = req.body;
  try {
    await createNewFavorite(favorite);
    return res.status(200).json({ message: 'Creado exitosamente' })
  } catch (error) {
    return res.status(400).send("error");
  }
}

module.exports =  postFavoriteHandler;