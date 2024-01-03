const salesCartController = require("../../controllers/SalesCart/putSalesCartController")

const putSalesCartHandler = async(req, res) => {
    try {
        const { id, quantity } = req.body
        const salesCart = await salesCartController(id, quantity)
        res.status(200).json(salesCart)
    } 
    catch (error) {
        
    }
}

module.exports = putSalesCartHandler