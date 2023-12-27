const { Product, Category, Brand, Colors } = require("../../db");

const sortByPriceController = async (order) => {
  try {
    const products = await Product.findAll({
      include: [
        {
            model: Category,
            attributes: ['category']
        },
        {
            model: Brand,
            attributes: ['brand']
        },
        {
            model: Colors,
            attributes: ['color']
        }
    ],
      order: [['price', order.toLowerCase()]], // por default el orden sera ascendente
    });

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      specifications: product.specifications,
      color: product.color.color,
      stock: product.stock,
      image: product.image,
      brand: product.brand.brand,
      category: product.category.category // Extrae solo el atributo 'category'
  }));
  return formattedProducts
  } catch (error) {
    throw new Error("Error al obtener y ordenar los productos por precio.");
  }
};

module.exports = sortByPriceController;
