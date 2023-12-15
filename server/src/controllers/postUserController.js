const {User} = require("../db")

const postUserController = async(name, lastname, email, password, address, role) =>{
    
    const newUser = await User.create({
        name,
        lastname,
        email,
        password,
        address,
        role,
    })
    
    return newUser;
}

module.exports = postUserController;