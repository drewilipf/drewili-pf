const filterProductCategory = require("../../controllers/Product/filterCategoryController");

const filterCategoryHandler = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Debe ingresar una categoria" });
    }

    const filterCategory = await filterProductCategory(category);
    
    res.status(200).json(filterCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = filterCategoryHandler;