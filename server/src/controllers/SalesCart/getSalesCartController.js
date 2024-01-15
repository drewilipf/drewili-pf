const { SalesCart, Product, Brand, Category } = require("../../db");

const getSalesCartController = async (userId) => {
    const salesCarts = await SalesCart.findAll({
        where: { user_id: userId },
        include: {
            model: Product,
            attributes: ['id', 'name', 'imageArray', 'price', 'stock', 'discount'], // Agregamos 'discount' para calcular 'finalPrice'
            include: [
                {
                    model: Category,
                    attributes: ["category"],
                    as: "Category",
                },
                {
                    model: Brand,
                    attributes: ["brand"],
                    as: "Brand",
                },
            ],
        },
        order: [['id', 'ASC']]
    });

    if (salesCarts.length === 0) {
        throw new Error("No se encontró al usuario");
    }

    const formattedSalesCart = salesCarts.map((product) => {
        const finalPrice = product.product.finalPrice; // Acceder al getter 'finalPrice'
        const totalPrice = parseFloat(finalPrice) * product.quantity;

        return {
            salesCartId: product.id,
            id: product.product.id,
            stock: product.product.stock,
            name: product.product.name,
            images: product.product.imageArray[0],
            price: finalPrice,
            quantity: product.quantity,
            totalPrice: isNaN(totalPrice) ? "0.00" : totalPrice.toFixed(2),
            brand: product.product.Brand.brand
        };
    });

    const totalCartPrice = formattedSalesCart.reduce((total, product) => total + parseFloat(product.totalPrice), 0).toFixed(2);

    return {
        products: formattedSalesCart,
        totalCartPrice: totalCartPrice
    };
};

module.exports = getSalesCartController;