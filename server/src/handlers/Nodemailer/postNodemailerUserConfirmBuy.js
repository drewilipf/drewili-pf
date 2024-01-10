const postNodemailerUserConfirmBuyController = require("../../controllers/Nodemailer/postNodemailerUserConfirmBuyController.js");

const postNodemailerUserConfirmBuyHandler = async (req, res) =>{
    try {
        const {name, email, product, cuantity, price, total, adress} = req.body

        await postNodemailerUserConfirmBuyController(name, email, product, cuantity, price, total, adress);

        res.status(200).send("correo enviado con exito")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = postNodemailerUserConfirmBuyHandler
