const {Category} = require("../../db")

const getCategoryController = async() =>{
    const categories = await Category.findAll();

    return categories;
}

module.exports = getCategoryController;