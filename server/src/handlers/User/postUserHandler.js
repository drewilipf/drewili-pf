const postUserController = require("../../controllers/User/postUserController")

const postUserHandler = async (req, res) =>{
    try {
        const {name, lastname, email, password, address, role, username} = req.body

        await postUserController(name, lastname, email, password, address, role, username);

        res.status(200).send("Usuario creado con éxito")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = postUserHandler