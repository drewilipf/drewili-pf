const getSalesCartController = require("../controllers/getSalesCartController")

const getSalesCartHandler = async(req, res) =>{
    try {
        const data = {}

        await getSalesCartController(data, res)

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error interno del server"})
    }
}

module.exports = getSalesCartHandler