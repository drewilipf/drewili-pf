const { SalesCart, Product } = require("../../db")

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
};

module.exports = successController;