const { Category } = require('../../db');

const createNewCategory = async (category) => {
    try {
        if (!category) {
            throw Error('Debe ingresar una categoría');
        }

        await Category.create({
            category: category
        });
        const categories = Category.findAll()
        return categories
    } catch (error) {
        
        throw error;
    }
};

module.exports = createNewCategory;