const deleteBrandController = require('../controllers/deleteBrandController')

const deleteBrandHandler = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteBrandController(id);
        res.status(200).send("Marca eliminada correctamente");
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = deleteBrandHandler;