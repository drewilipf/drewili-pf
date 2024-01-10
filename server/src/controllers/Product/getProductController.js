const { Product, Category, Brand, Colors } = require("../../db");

const getProductsController = async () => {
  const products = await Product.findAll({
    include: [
      {
        model: Category,
        attributes: ["category"],
        as: "Category",
      },
      {
        model: Brand,
        attributes: ["brand"],
        as: "Brand",
      },
      {
        model: Colors,
        attributes: ["color"],
        as: "Colors",
      },
    ],
    where: {},
  });

  const formattedProducts = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      specifications: product.specifications,
      color: product.Colors.color, 
      stock: product.stock,
      image: product.image,
      brand: product.Brand.brand,
      category: product.Category.category,
      deleted: product.deleted,
      relevance: product.relevance,
      images: product.imageArray,
      date: product.createdAt,
    };
  });

  return formattedProducts;
};

module.exports = getProductsController;
