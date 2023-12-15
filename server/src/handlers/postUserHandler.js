const postUserController = require('../controllers/postProductController');

const postUserHandler = async (req, res) => {
    try {
        await postUserController(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = postUserHandler;
