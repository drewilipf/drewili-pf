const postColorController = require("../../controllers/Color/postColorController");

const postColorHandler = async (req, res) => {

    const {color} = req.body;

    try {
        const colors =  await postColorController(color);
        return res.status(200).json(colors)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = postColorHandler
