const getProductById = require("../../controllers/Product/getProductById")

const getProductId = async(req, res)=>{
    try {
        const {id} = req.params
        const productById = await getProductById(id)
        res.status(200).json(productById)
    } 
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getProductId