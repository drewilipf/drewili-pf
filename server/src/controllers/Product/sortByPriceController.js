const { Product, Category, Brand, Colors } = require("../../db");

const sortByPriceController = async (order) => {
  try {
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
      order: [["price", order.toLowerCase()]], 
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
        date: product.createdAt,
        discount: product.discount,
      };
    });

    return formattedProducts;
  } catch (error) {
    throw new Error("Error al obtener y ordenar los productos por precio.");
  }
};

module.exports = sortByPriceController;
