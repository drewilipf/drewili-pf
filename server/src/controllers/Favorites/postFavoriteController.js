const { Favorite } = require('../../db');

const createNewFavorite = async ( product_id, user_id) => {

    const newFavorite = await Favorite.create({
        

        product_id,
        user_id

    });

    return newFavorite;

};

module.exports = createNewFavorite;