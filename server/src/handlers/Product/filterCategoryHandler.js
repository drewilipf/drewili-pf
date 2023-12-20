const filterProductCategory = require("../../controllers/Product/filterCategoryController")

const filterCategoryHandler = async(req, res) => {
    try {
        const {category} = req.body
        const filterCategory = await filterProductCategory(category)
        console.log(filterCategory);
        res.status(200).json(filterCategory)
    }
    catch (error) {
        
    }
}

module.exports = filterCategoryHandler