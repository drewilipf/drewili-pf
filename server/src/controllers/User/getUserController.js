const {User} = require("../../db")

const getUserController = async(data, res) =>{
    const users = await User.findAll();

    return users;
}

module.exports = getUserController;