const {Category} = require("../../db")

const deleteSoftCategoryController = async(id) =>{

    const category = await Category.findByPk(id);

    category.deleted = true;
    
    await category.save();

    return category;
}

module.exports = deleteSoftCategoryController;