const { Product, PurchaseHistory } = require("../../db");

const postHistoryController = async(updateProduct, userId) =>{

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
        quantity: product.cantidad
    }));

    await PurchaseHistory.bulkCreate(purchaseHistoryData);
}

module.exports = postHistoryController