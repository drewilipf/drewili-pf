const  sortRecommendedController  = require('../../controllers/Product/sortByRecommendedController')


const sortRecommendedProductHandler = async (req, res) => {
    try {
        const productRecommended = await sortRecommendedController();
        res.status(200).json(productRecommended)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = sortRecommendedProductHandler ;
