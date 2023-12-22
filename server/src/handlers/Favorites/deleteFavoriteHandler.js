const favoriteDeleteController = require("../../controllers/Favorites/deleteFavoriteController");

const favoriteDeleteHandler = async(req, res) => {
    try {
        const { id } = req.params;

        const favorite = await favoriteDeleteController(id);

        if (!favorite) {
            return res.status(404).json({ error: 'No encontrado' });
        }
        res.status(200).send("Eliminado correctamente");
        
    }   catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = favoriteDeleteHandler;