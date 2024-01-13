const postNodemailerRecoverPassController = require("../../controllers/Nodemailer/postNodemailerRecoverPassController.js");

const postNodemailerRecoverPassHandler = async (req, res) =>{
    try {
        const {username, email, otp} = req.body

        await postNodemailerRecoverPassController(username, email, otp);

        res.status(200).send("correo enviado con exito")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = postNodemailerRecoverPassHandler