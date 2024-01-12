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

    const formattedProducts = productsByRating.map((product) => {
      return {
        idComment: product.id,
        id:product.product.id,
        comment: product.comment,
        rating: product.rating,
        name: product.product.name,
        description: product.description,
        price: product.product.price,
        specifications: product.specifications,
        color: product.product.Colors.color,
        stock: product.product.stock,
        image: product.product.image,
        brand: product.product.Brand.brand,
        category: product.product.Category.category,
        deleted: product.product.deleted,
        relevance: product.product.relevance,
        date: product.createdAt,
      };
    });

    return formattedProducts;
  } catch (error) {
    throw new Error(`Error al ordenar por rating: ${error.message}`);
  }
};

module.exports = sortProductsByRatingController;
