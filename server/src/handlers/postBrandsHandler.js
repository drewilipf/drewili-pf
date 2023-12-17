const createNewBrand = require('../controllers/postBrandController')

const postBrandHandler = async (req, res) => {
    const { brand } = req.body;
    try {
        await createNewBrand(brand);
        return res.status(200).json({ message: 'Marca creada exitosamente'})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = postBrandHandler;