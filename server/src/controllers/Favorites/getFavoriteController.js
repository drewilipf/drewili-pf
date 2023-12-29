const { Favorite, Product, Brand, Category } = require('../../db');

const getFavoriteController = async (userId) => {
    try {
        const favorites = await Favorite.findAll({
            where: { user_id: userId },
            include: {
                model: Product,
                attributes: ['id', 'name', 'image'],
                include: [
                    {
                        model: Brand,
                        attributes: ['id', 'brand'],
                    },
                    {
                        model: Category,
                        attributes: ['id', 'category'],
                    },
                ],
            },
        });

        if (favorites.length === 0) {
            throw new Error("No se encontró al usuario");
        }

        const formattedFavorites = favorites.map((favorite) => ({
            favorited: favorite.id,
            id: favorite.product.id,
            name: favorite.product.name,
            image: favorite.product.image,
            brand: favorite.product.brand.brand,
        }));

        return {
            favorites: formattedFavorites,
        };
    } catch (error) {
        throw new Error(`Error en getFavoriteController: ${error.message}`);
    }
};

module.exports = getFavoriteController;

