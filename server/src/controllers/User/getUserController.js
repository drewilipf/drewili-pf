const {User} = require("../../db")

const getUserController = async() =>{
    const users = await User.findAll();

    return users;
}

module.exports = getUserController;