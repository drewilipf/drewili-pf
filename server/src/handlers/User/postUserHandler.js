const postUserController = require("../../controllers/User/postUserController")

const postUserHandler = async (req, res) =>{
    try {
        const {name, lastname, email, password, address, role} = req.body

        await postUserController(name, lastname, email, password, address, role);

        res.status(200).send("Usuario creado con éxito")
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Error interno del server"})
    }
}

module.exports = postUserHandler