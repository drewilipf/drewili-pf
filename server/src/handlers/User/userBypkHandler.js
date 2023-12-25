const userByPkController = require("../../controllers/User/userByPkController")

const userByPk = async(req, res) => {
    try {
        const { id } = req.params
        const user =  await userByPkController(id) 
        res.status(200).json(user)
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = userByPk