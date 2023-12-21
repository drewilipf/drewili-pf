const putColorController = require("../../controllers/Color/putColorController");

const putColorHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedColor = req.body;

    await putColorController(id, updatedColor);

    res.status(200).send("Color actualizado con éxito");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = putColorHandler;