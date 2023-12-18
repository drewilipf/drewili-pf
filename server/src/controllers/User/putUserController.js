const { User } = require('../../db')

const putUserController = async (id, updatedUserData)=>{

    try {

        const user = await User.findByPk(id)

        if(!user) return res.status(404).json({ error: 'Usuario no encontrado' })

        await User.update(updatedUserData)

        return res.status(200).json({message:"Usuario atualizado"})
        
    } catch (error) {

        res.status(500).json({ error: "SERVER ERROR" });
        
    }

}
module.exports = putUserController