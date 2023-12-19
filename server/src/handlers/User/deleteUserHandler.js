const userSoftDeleteController = require('../../controllers/User/deleteUserController')

const userSoftDeleteHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userSoftDeleteController(id)

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        return res.status(200).json({ message: 'Usuario eliminado exitosamente' });

    }   catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = userSoftDeleteHandler;
