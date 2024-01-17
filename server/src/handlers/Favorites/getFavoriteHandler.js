const getFavoriteController = require("../../controllers/Favorites/getFavoriteController")


const getFavoriteHandler = async(req, res)=> {
    try {
        const {userId} = req.query
        const favorite = await getFavoriteController(userId)

          
        
        return res.status(200).json(favorite)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getFavoriteHandler;