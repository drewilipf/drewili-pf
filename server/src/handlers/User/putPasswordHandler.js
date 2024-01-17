const putPasswordController = require("../../controllers/User/putPasswordController")

const putPasswordHandler = async (req, res) => {
    const {userName, password} = req.body
    try {
        const newPassword = await putPasswordController(userName, password)
        res.status(200).json(newPassword)
    } catch (error) {
        
    }

}

module.exports = putPasswordHandler