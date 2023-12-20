const { Favorite } = require('../../db');

const getFavoriteController = async (req, res) => {

    const { id, product_id, user_id } = req.body

    const favorite = await Favorite.findOrCreate({
            where: {
                id, product_id, user_id
            }
        })

    return favorite
}

module.exports = getFavoriteController;

