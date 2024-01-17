const { Product, Category, Brand, Colors } = require("../../db");
const { Op } = require("sequelize");

const getProductKeyWordController = async (keyWord) => {
  if (!keyWord || typeof keyWord !== "string" || keyWord === "mierda") {
    throw new Error("La palabra clave es inválida");
  }
  

  const products = await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${keyWord}%`, 
      },
    },
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
      brand: product.Brand.brand, 
      category: product.Category.category, 
      deleted: product.deleted,
      relevance: product.relevance,
      images: product.imageArray,
      date: product.createdAt,
      discount: product.discount,
    };
  });

  if (formattedProducts.length === 0)
    throw new Error("No hay productos con esta palabra clave");
  return formattedProducts;
};

module.exports = getProductKeyWordController;
