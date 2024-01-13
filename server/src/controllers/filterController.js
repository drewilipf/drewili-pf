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
    });

    const formattedProducts = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        specifications: product.specifications,
        color: product.Colors.color,  // Accede a la propiedad 'color' dentro de 'Colors'
        stock: product.stock,
        image: product.image,
        images: product.imageArray,
        brand: product.Brand.brand,  // Accede a la propiedad 'brand' dentro de 'Brand'
        category: product.Category.category,  // Accede a la propiedad 'category' dentro de 'Category'
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