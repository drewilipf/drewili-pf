const filterColorController = require("../../controllers/Color/filterColorController");

const filterColorHandler = async (req, res) => {
  try {
    const { color } = req.query; //para pasar por query el nombre del color con el que filtrar

    if (!color) {
      return res.status(400).json({ error: 'Debes proporcionar un color en la consulta.' });
    }

    const filteredProducts = await filterColorController(color);

    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = filterColorHandler;
