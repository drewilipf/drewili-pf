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

    const formattedSalesCart = salesCarts.map((product)=>({
        id: product.product.id,
        name: product.product.name,
        image: product.product.image,
        price: product.product.price,
        quantity: product.quantity,
        totalPrice: product.product.price*product.quantity,
        brand: product.product.brand.brand
    }))


    return formattedSalesCart;
};

module.exports = getSalesCartController;