const deleteSoftCategoryController = require("../../controllers/Category/deleteCategoryController");

const deleteSoftCategoryHandler = async(req, res) => {
    try {
        const { id } = req.params;

        const category = await deleteSoftCategoryController(id);

        if (!category) {
            return res.status(404).json({ error: 'Categoria no encontrada' });
        }
        res.status(200).send("Categoria eliminada correctamente");
        
    }   catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = deleteSoftCategoryHandler;