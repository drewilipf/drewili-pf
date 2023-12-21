const {Category} = require("../../db")

const getCategoryController = async() =>{
    const categories = await Category.findAll({
        where: {
          deleted: false,
        }
        });

    return categories;
}

module.exports = getCategoryController;