const getColorController = require("../../controllers/Color/getColorController")

const getColorHandler = async (req, res) =>{
    try {
        const users = await getColorController()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
}

module.exports = getColorHandler