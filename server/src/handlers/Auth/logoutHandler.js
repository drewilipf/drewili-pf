const logoutController = require("../../controllers/Auth/logoutController")

const logOutHandler = async(req, res) =>{
    try {
        const message = await logoutController(req)
        res.status(200).json({message})
    }
    catch (error) {
        
    }
}

module.exports = logOutHandler