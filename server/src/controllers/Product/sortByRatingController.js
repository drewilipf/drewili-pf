const { Comments, Product, Category, Brand, Colors } = require("../../db");

const sortProductsByRatingController = async (order = 'DESC') => {
  try {
    const productsByRating = await Comments.findAll({
      order: [['rating', order]], 
      include: [
        {
          model: Product,
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
        },
      ],
    });

    const formattedProducts = productsByRating.map(({ Product: product }) => {
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
        date: product.createdAt,
      };
    });

    return formattedProducts;
  } catch (error) {
    throw new Error(`Error al ordenar por rating: ${error.message}`);
  }
};

module.exports = sortProductsByRatingController;
