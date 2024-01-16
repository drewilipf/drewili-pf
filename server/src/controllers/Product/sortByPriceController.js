const { Product, Category, Brand, Colors } = require("../../db");

const sortByPriceController = async (order) => {
  try {
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
      order: [["price", order.toLowerCase()]], // por default el orden sera ascendente
    });

    const formattedProducts = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        specifications: product.specifications,
        color: product.Colors.color, // Accede a la propiedad 'color' dentro de 'Colors'
        stock: product.stock,
        image: product.image,
        brand: product.Brand.brand, // Accede a la propiedad 'brand' dentro de 'Brand'
        category: product.Category.category, // Accede a la propiedad 'category' dentro de 'Category'
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
