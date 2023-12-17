const deleteCategoryController = require('../controllers/deleteCategoryController')

const deleteCategoryHandler = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteCategoryController(id);
        res.status(200).send("Categoria eliminada correctamente");
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = deleteCategoryHandler;