const getBrandController = require('../controllers/getBrandController')

const getBrandHandler = async(req, res)=>{
    try {
        const categories = await getBrandController();
        res.status(200).json({categories})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getBrandHandler;