const getCategoryController = require('../controllers/getCategoryController')

const getCategoryHandler = async(req, res)=>{
    try {
        const categories = await getCategoryController();
        res.status(200).json({categories})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getCategoryHandler;