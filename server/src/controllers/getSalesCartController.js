const {SalesCart} = require("../db")

const getSalesCartController = async(data, res) =>{
    const salesCarts = await SalesCart.findAll();

    res.status(200).json(salesCarts);
}

module.exports = getSalesCartController;