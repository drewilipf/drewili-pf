const filterPriceController = require("../../controllers/Product/filterPriceController")

const filterPrice = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.body
        const products = await filterPriceController(minPrice, maxPrice)
        res.status(200).json(products)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = filterPrice