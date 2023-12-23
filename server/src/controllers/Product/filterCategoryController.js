const { Category, Product } = require("../../db");

const filterProductCategory = async (category) => {
  const selectedCategory = await Category.findOne({
    where: { category: category },
  });
  const products = await Product.findAll({
    where: {
      category_id: selectedCategory.id,
      deleted: false,
    },
  });

  return products;
};

module.exports = filterProductCategory;