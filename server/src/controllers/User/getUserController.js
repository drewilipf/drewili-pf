const {User} = require("../../db")

const getUserController = async() =>{
    const users = await User.findAll({
        where: {
          deleted: false,
        }
        });

    return users;
}

module.exports = getUserController;