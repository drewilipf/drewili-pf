const { SalesCart, Product, Brand, Category } = require("../../db");

const getSalesCartController = async (userId) => {
    const salesCarts = await SalesCart.findAll({

        where: { user_id: userId },
        include: {
            model: Product,
            attributes: ['id', 'name', 'image', 'price'],
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

    if (salesCarts.length === 0){
        throw new Error ("No se encontró al usuario")
    }


    return salesCarts;
};

module.exports = getSalesCartController;