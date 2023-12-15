const { Users } = require('../models/users');

const postUserController = async (req, res) => {
    try {
        const { name, lastName, email, password, address, role } = req.body;

        const newUser = await Users.create({
            name,
            lastName,
            email,
            password,
            address,
            role
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = postUserController;
