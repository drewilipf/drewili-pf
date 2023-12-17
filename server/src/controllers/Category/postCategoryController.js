const { Category } = require('../../db');

const createNewCategory = async (category) => {
    try {
        if (!category) {
            throw Error('Debe ingresar una categoría');
        }

        const newCategory = await Category.create({
            category: category
        });

        return newCategory;
    } catch (error) {
        
        throw error;
    }
};

module.exports = createNewCategory;