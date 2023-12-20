const getFavoriteController = require("../../controllers/Favorites/getFavoriteController")


const getFavoriteHandler = async(req, res)=> {
    try {
        
        const favorite = await getFavoriteController(id)

        if(!id)  return res.status(401).send('Faltan datos')   
        
        return res.status(200).json(favorite)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getFavoriteHandler;