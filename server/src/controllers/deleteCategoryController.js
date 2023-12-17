const {Category} = require("../db")

const deleteCategoryController = async(id) =>{
const deleteCategory = await Category.destroy({
    where:{
        id:id
    }
})
return deleteCategory
}

module.exports = deleteCategoryController;