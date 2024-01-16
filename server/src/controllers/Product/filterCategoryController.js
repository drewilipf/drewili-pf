const { Category, Product, Brand, Colors } = require("../../db");

const filterProductCategory = async (category) => {
  const selectedCategory = await Category.findOne({
    where: { category: category },
  });
  const products = await Product.findAll({
    where: { category_id: selectedCategory.id },
    include: [
      { model: Colors, attributtes: ["color"] },
      {
        model: Brand,
        attributtes: ["brand"],
      },
      {
        model: Category,
        attributtes: ["category"],
      },
    ],
  });

  const formattedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    specifications: product.specifications,
    color: product.color.color,
    brand: product.brand.brand,
    category: product.category.category,
    stock: product.stock,
    image: product.image,
  }));
  return formattedProducts;
};

module.exports = filterProductCategory;
