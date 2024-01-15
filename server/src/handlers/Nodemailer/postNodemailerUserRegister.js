const postNodemailerUserRegisterController = require("../../controllers/Nodemailer/postNodemailerUserRegisterController");

const postNodemailerUserRegisterHandler = async (req, res) =>{
    try {
        const {name, email} = req.body

        await postNodemailerUserRegisterController(name, email);

        res.status(200).send("correo enviado con exito")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = postNodemailerUserRegisterHandler
