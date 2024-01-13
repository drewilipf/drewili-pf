const { SalesCart, Product, PurchaseHistory } = require("../../db")

const successController = async (userId, updateProduct) => {
    await SalesCart.emptyCart(userId);

    const updatePromises = updateProduct.map(async (product) => {
        const modifiedProduct = await Product.findOne({
            where: { id: product.idProd }
        });
        modifiedProduct.stock -= product.cantidad;
        await modifiedProduct.save();
    });

    await Promise.all(updatePromises);

    const purchaseHistoryData = updateProduct.map(product => ({
        user_id: userId,
        product_id: product.idProd,
        quantity: product.cantidad,
        paymentStatus: 'aprobado'
    }));

    const newHistory = await PurchaseHistory.bulkCreate(purchaseHistoryData);

    return newHistory

};

module.exports = successController;