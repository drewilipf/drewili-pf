const { Colors, Product } = require("../../db");

const filterColorController = async (color) => {
  const selectedColor = await Colors.findOne({
    where: { color: color },
  });

  if (!selectedColor) {
    throw new Error("Color no encontrado en la base de datos");
  }

  const products = await Product.findAll({
    where: {
      color_id: selectedColor.id,
      deleted: false,
    },
  });

  return products;
};

module.exports = filterColorController;
