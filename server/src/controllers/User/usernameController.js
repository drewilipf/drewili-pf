const { User } = require("../../db")

const usernameController = async(username) =>{
    const user = await User.findOne({
        where: {username: username}
    })

    if (!user) {
        throw new Error('Usuario no encontrado')
    }
}

module.exports = usernameController