const { Colors, Product, Brand, Category } = require("../../db");

const filterColorController = async (color) => {
  const selectedColor = await Colors.findOne({
    where: { color: color },
  });

  if (!selectedColor) {
    throw new Error("Color no encontrado en la base de datos");
  }

   const products = await Product.findAll({
        where:{ color_id: selectedColor.id, deleted: false},
        include:[
         { model: Colors,
          attributtes:['color']
         },
         {
          model: Brand,
          attributtes:['brand']
         },
         {
          model: Category,
          attributtes:['category']
         }
        ]
    });

    const formattedProducts = products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        specifications: product.specifications,
        color: product.color.color,
        brand: product.brand.brand,
        category: product.category.category,
        stock: product.stock,
        image: product.image
    }));
    return formattedProducts
  }
module.exports = filterColorController;