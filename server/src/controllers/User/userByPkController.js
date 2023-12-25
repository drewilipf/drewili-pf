const { User } = require("../../db")

const userByPkController = async(id) =>{
    const response = await User.findOne({
        where:{id:id}})
    if (!response) {
        throw new Error('No hay ningun usuario registrado con ese Id')
    }
        return response
    
}

module.exports = userByPkController