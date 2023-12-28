const { SalesCart } = require("../../db")

const salesCartController = async(quantity, idProduct, idUser) => {
   const saleCartProduct = await SalesCart.findOne({
        where:{
            product_id: idProduct,
            user_id: idUser
        }
    })
    if (saleCartProduct) {
        saleCartProduct.quantity = quantity
        await saleCartProduct.save()
    }
    return saleCartProduct
}

module.exports = salesCartController