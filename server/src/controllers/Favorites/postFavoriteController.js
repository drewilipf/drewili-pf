const { Favorite } = require('../../db');

const createNewFavorite = async (favorite) => {      

        const newFavorite = await Favorite.create({

            favorite: favorite
            
        });

        return newFavorite;
    
};

module.exports = createNewFavorite;