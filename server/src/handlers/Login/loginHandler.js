const loginController = require("../../controllers/Login/loginController")

const loginHandler = async (req, res) => {
    try {
        const { username, password } = req.body
        const userLogin = await loginController(username, password)
        req.session.user = {
            userId: userLogin.id,
            username: userLogin.username
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', access: true })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = loginHandler