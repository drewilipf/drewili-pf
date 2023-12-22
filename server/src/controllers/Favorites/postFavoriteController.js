const { Favorite } = require('../../db');

const createNewFavorite = async (id, product_id, user_id) => {

    const newFavorite = await Favorite.create({
        
        id,
        product_id,
        user_id

    });

    return newFavorite;

};

module.exports = createNewFavorite;