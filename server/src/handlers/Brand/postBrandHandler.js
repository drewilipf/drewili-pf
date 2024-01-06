const createNewBrand = require('../../controllers/Brand/postBrandController')

const postBrandHandler = async (req, res) => {
    const { brand } = req.body;
    try {
        const brands = await createNewBrand(brand);
        return res.status(200).json(brands)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = postBrandHandler;