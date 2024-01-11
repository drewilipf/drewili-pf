const { SalesCart } = require("../../db")

const allDeleteController = async(userId) => {
    await SalesCart.emptyCart(userId)
}

module.exports = allDeleteController