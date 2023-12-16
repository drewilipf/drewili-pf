const { Category } = require('../db');

const createNewCategory = async (category) => {
    try {
        if (!category) {
            throw new Error('Debe ingresar una categoría');
        }

        const newCategory = await Category.create({
            name: category
        });

        return newCategory;
    } catch (error) {
        // Capturamos cualquier error que ocurra durante la creación de la categoría
        throw error;
    }
};

module.exports = createNewCategory;