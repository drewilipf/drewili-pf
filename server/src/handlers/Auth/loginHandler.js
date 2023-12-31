const loginController = require("../../controllers/Auth/loginController");

const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userLogin = await loginController(username, password);

    const userSession = (req.session.user = {
      name: userLogin.name,
      lastname: userLogin.lastname,
      userId: userLogin.id,
      username: userLogin.username,
      address: userLogin.address,
      email: userLogin.email,
      password: userLogin.password,
      role: userLogin.role,
    });

    res
      .status(200)
      .json({ message: "Inicio de sesión exitoso", access: true, userSession });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = loginHandler;
