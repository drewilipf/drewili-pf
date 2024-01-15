const bcrypt = require('bcrypt')
const { User } = require("../../db")

const putPasswordController = async (userName, password) => {
    try {
        const newPassword = await User.findOne({
            where: {username: userName}
        })
        const hashPassword = await bcrypt.hash(password, 10)
        if(newPassword){
            newPassword.password = hashPassword
            await newPassword.save()
        }
        return newPassword
    } catch (error) {

    }

}

module.exports = putPasswordController