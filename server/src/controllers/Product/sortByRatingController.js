const { Sequelize } = require("sequelize");
const { Comments, Product, Category, Brand, Colors } = require("../../db");

const sortProductsByRatingController = async (order = 'DESC') => {
  try {
      const productsByRating = await Comments.findAll({
          attributes: [
              'product_id',
              [Sequelize.fn('AVG', Sequelize.col('rating')), 'averagerating'], 
          ],
          group: ['product_id', 'product.id', 'product.name', 'product.price', 'product.stock', 'product.image', 'product.deleted', 'product.relevance', 'product.Colors.id'], 
          order: [[Sequelize.literal('averagerating'), order]],
          include: [
              {
                  model: Product,
                  attributes: [
                      "id",
                      "name",
                      "price",
                      "imageArray",
                      "deleted",
                      "relevance",
                  ],
                  as: 'product',
                  include: [
                    {
                        model: Colors,
                        attributes: ["color"],
                        as: "Colors",
                    },
                ],
              },
          ],
          raw: true, 
      });

      const formattedProducts = productsByRating.map((product) => {
          return {
              idComment: product.product_id,
              comment: product.comment,
              rating: product.averagerating,
              id: product['product.id'],
              name: product['product.name'],
              price: product['product.price'],
              images: product['product.imageArray'],
              color: product['product.Colors.color']
          };
      });

      return formattedProducts;
  } catch (error) {
      throw new Error(`Error al ordenar por rating: ${error.message}`);
  }
};

module.exports = sortProductsByRatingController;