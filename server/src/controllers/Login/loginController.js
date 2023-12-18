const bcrypt = require('bcrypt')
const { User } = require('../../db')

const loginController = async(username, password) =>{
    if (!username || !password) {
        throw new Error('Debe ingresar un nombre de usuario o una contraseña')
    }
    const userLogin = await User.findOne({
        where:{username: username}
    })
    if (!userLogin) {
        throw new Error('No hay ningun usuario registrado con ese nombre')
    }
    const confirmPassword = await bcrypt.compare(password, userLogin.password)
    if(!confirmPassword){
        throw new Error('Contraseña incorrecta')
    }

    return userLogin
}

module.exports = loginController