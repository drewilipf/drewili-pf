const { SalesCart } = require("../../db")

const salesCartController = async(id, quantity) => {
   const saleCartProduct = await SalesCart.findOne({
        where:{
            id: id
        }
    })
    if (saleCartProduct) {
        saleCartProduct.quantity = quantity
        await saleCartProduct.save()
    }
    return saleCartProduct
}

module.exports = salesCartController