const getUserController = require("../../controllers/User/getUserController")

const getUserHandler = async (req, res) =>{
    try {

        const users = await getUserController()
        res.status(200).json(users)

    } catch (error) {
        
        console.error(error);
        res.status(500).json({error: "Error interno del server"})

    }
}

module.exports = getUserHandler;