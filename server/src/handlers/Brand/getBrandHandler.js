const getBrandController = require('../../controllers/Brand/getBrandController')

const getBrandHandler = async(req, res)=>{
    try {
        const brands = await getBrandController();
        res.status(200).json(brands)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getBrandHandler;