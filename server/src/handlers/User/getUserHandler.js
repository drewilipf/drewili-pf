const getUserController = require("../../controllers/User/getUserController")

const getUserHandler = async (req, res) =>{
    try {
        const data = {};

        await getUserController(data, res)

    } catch (error) {
        
        console.error(error);
        res.status(500).json({error: "Error interno del server"})

    }
}

module.exports = getUserHandler;