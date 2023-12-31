const { PurchaseHistory, Product, User } = require("../../db");

const getPurchaseHistory = async (userId) => {
    const purchaseHistory = await PurchaseHistory.findAll({
        where: { user_id: userId },
        include: [
            {
                model: Product,
                attributes: ['id', 'name', 'image', 'price'],
            },
            {
                model: User,
                attributes: ['id', 'username'],
            },
        ],
        order: [['id', 'ASC']],
    });

    if (purchaseHistory.length === 0) {
        throw new Error("No se encontraron registros de compra para el usuario");
    }

    const formattedPurchaseHistory = purchaseHistory.map((purchase) => ({
        purchaseId: purchase.id,
        productId: purchase.product_id,
        productName: purchase.product.name,
        productImage: purchase.product.image,
        productPrice: purchase.product.price,
        quantity: purchase.quantity,
        userId: purchase.user_id,
        username: purchase.user.username,
        date: purchase.purchase_date
    }));

    return formattedPurchaseHistory;
};

module.exports = getPurchaseHistory;
