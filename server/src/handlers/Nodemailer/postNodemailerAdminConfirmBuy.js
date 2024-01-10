const postNodemailerAdminConfirmBuyController = require("../../controllers/Nodemailer/postNodemailerAdminConfirmBuyController.js");

const postNodemailerAdminConfirmBuyHandler = async (req, res) =>{
    try {
        const {name, email, product, cuantity, price, total, adress} = req.body

        await postNodemailerAdminConfirmBuyController(name, email, product, cuantity, price, total, adress);

        res.status(200).send("correo enviado con exito")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = postNodemailerAdminConfirmBuyHandler