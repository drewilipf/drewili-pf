const { Colors } = require("../../db");

const putColorController = async (id, updatedColor) => {
  const color = await Colors.findByPk(id);
  if (!color) throw new Error("Color no identificado o inexistente en la base de datos");

  await color.update(updatedColor);
  return "Color actualizado con éxito";
};

module.exports = putColorController;