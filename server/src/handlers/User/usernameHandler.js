const usernameController = require("../../controllers/User/usernameController")

const usernameHandler = async(req, res) =>{
    try {
        const {username} = req.query
        await usernameController(username)

        res.status(200).json({message: 'Usuario existente'})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = usernameHandler