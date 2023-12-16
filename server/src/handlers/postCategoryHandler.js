const createNewCategory = require('../controllers/postCategoryController')

const postCategoryHandler = async (req, res) => {
    const { category } = req.body;
    try {
        await createNewCategory(category);
        return res.status(200).json({ message: 'Categoría creada exitosamente'})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { postCategoryHandler }