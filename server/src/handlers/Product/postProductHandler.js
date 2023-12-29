const postProductsController = require("../../controllers/Product/postProductController");

const postProductsHandler = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      specifications,
      stock,
      image,
      brand_id,
      category_id,
      color_id,
    } = req.body;

    await postProductsController(
      name,
      description,
      price,
      specifications,
      stock,
      image,
      brand_id,
      category_id,
      color_id
    );

    res.status(200).send("Producto creado con éxito");
  } catch (error) {
    console.error(error);
    console.error(
      `Error al procesar la solicitud ${req.method} ${req.url}`,
      error
    );
    res.status(500).json({
      error: "Error interno del servidor",
      details: "Descripción detallada del error",
      errorDetails: error.message,
    });
  }
};

module.exports = postProductsHandler;
