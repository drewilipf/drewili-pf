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
      where: {
        deleted: false, 
        ...filterConditions},
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
        images: product.imageArray,
        brand: product.Brand.brand,  
        category: product.Category.category,  
        deleted: product.deleted,
        relevance: product.relevance,
        date: product.createdAt,
      };
    });

    return formattedProducts;
  } catch (error) {
    console.error(error);
    throw new Error('Error obteniendo productos');
  }
};

module.exports = filterController;