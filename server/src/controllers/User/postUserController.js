const {User} = require("../../db")
const bcrypt = require('bcrypt')
const postUserController = async(name, lastname, email, password, address, role, username) =>{

    const existingUser = await User.findOne({
        where:{ username: username}
    })
    
    if (existingUser) {
        throw new Error ('El usuario ya existe')
    }
    else{
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            lastname,
            email,
            username,
            password: hashPassword,
            address,
            role,
        })
        
        return newUser;
    }
}

module.exports = postUserController;