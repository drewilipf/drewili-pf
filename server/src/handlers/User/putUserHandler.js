const putUserController = require ('../../controllers/User/putUserController')


const putUserHandler = async(req, res) => {
    try {

        const { id } = req.params

        const updatedUserData = req.body

        const res = await putUserController (id, updatedUserData)

        res.status(200).send("Usuario actualizado exitosamente")
        
    } catch (error) {

        res.status(500).json({ error: "SERVER ERROR" });
        
    }
}

module.exports = putUserHandler
