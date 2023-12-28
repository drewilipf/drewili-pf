const salesCartController = require("../../controllers/SalesCart/putSalesCartController")

const putSalesCartHandler = async(req, res) => {
    try {
        const { quantity, idProduct, idUser} = req.body
        const salesCart = await salesCartController(quantity, idProduct, idUser)
        res.status(200).json(salesCart)
    } 
    catch (error) {
        
    }
}

module.exports = putSalesCartHandler