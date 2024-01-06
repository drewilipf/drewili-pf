const postGoogleController = require("../../controllers/User/postGoogleController")

const postGoogleHandler = async(req, res) =>{
    try {
        const {userName, authId, email } = req.body
        const userGoogle = await postGoogleController(userName, authId, email)
        res.status(200).json(userGoogle)
    } 
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = postGoogleHandler