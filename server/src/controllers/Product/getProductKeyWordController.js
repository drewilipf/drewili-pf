const { Product, Category, Brand, Colors } = require("../../db");
const { Op } = require("sequelize");

const getProductKeyWordController = async (keyWord) => {
  if (!keyWord || typeof keyWord !== "string" || keyWord === "mierda") {
    throw new Error("La palabra clave es inválida");
  }
  console.log(keyWord);

  const products = await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${keyWord}%`, // Buscar coincidencias parciales sin importar mayúsculas/minúsculas
      },
    },
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
      brand: product.Brand.brand,  // Accede a la propiedad 'brand' dentro de 'Brand'
      category: product.Category.category,  // Accede a la propiedad 'category' dentro de 'Category'
      deleted: product.deleted,
      relevance: product.relevance,
      date: product.createdAt,
    };
  });

  if (formattedProducts.length === 0)
    throw new Error("No hay productos con esta palabra clave");
  return formattedProducts;
};

module.exports = getProductKeyWordController;
