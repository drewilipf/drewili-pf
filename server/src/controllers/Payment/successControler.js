const { SalesCart } = require("../../db")

const successController = async(userId) =>{
    await SalesCart.emptyCart(userId)
    
}

module.exports = successController