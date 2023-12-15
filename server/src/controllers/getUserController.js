const {User} = require("../db")

const getUserController = async(data, res) =>{
    const users = await User.findAll();

    res.status(200).json(users)
}

module.exports = getUserController;