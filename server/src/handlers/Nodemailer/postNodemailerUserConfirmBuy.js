const postNodemailerUserConfirmBuyController = require("../../controllers/Nodemailer/postNodemailerUserConfirmBuyController.js");

const postNodemailerUserConfirmBuyHandler = async (req, res) =>{
    try {
        const {name, email, products, total, adress,status} = req.body

        await postNodemailerUserConfirmBuyController(name, email, products, total, adress, status);

        res.status(200).send("correo enviado con exito")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = postNodemailerUserConfirmBuyHandler
