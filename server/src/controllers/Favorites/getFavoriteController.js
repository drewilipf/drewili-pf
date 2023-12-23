const { Favorite } = require('../../db');

const getFavoriteController = async () => {

    const favorite = await Favorite.findAll()

    return favorite
}

module.exports = getFavoriteController;

