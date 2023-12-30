const { Op } = require("sequelize");
const { Category, Brand, Colors, Product } = require("../db");


const filterController = async (filters) => {
    try {
        const { category, brand, color, minPrice, maxPrice } = filters;


        const filterConditions = {};
    
        if (category) {
          filterConditions["$Category.category$"] = category;
        }
    
        if (brand) {
          filterConditions["$Brand.brand$"] = brand;
        }
    
        if (color) {
          filterConditions["$Colors.color$"] = color;
        }
    
        if (minPrice && maxPrice) {
            filterConditions.price = {
              [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)],
            };
          }
    
        const products = await Product.findAll({
          include: [
            {
              model: Category,
              attributes: ["category"],
              as: "Category", // Agrega un alias para la tabla Category
            },
            {
              model: Brand,
              attributes: ["brand"],
              as: "Brand", // Agrega un alias para la tabla Brand
            },
            {
              model: Colors,
              attributes: ["color"],
              as: "Colors", // Agrega un alias para la tabla Colors
            },
          ],
          where: filterConditions
        });

//   const formattedProducts = products.map((product) => ({
//     id: product.id,
//     name: product.name,
//     description: product.description,
//     price: product.price,
//     specifications: product.specifications,
//     color: product.color.color,
//     stock: product.stock,
//     image: product.image,
//     brand: product.brand.brand,
//     category: product.category.category,
//     deleted: product.deleted,
//     relevance: product.relevance,
//     date: product.createdAt,
//   }));

  return products;
} catch (error) {
    console.error(error);
    throw new Error('Error obteniendo productos');
  }
};

module.exports = filterController;