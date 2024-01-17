const postNodemailerAdminConfirmBuyController = require("../../controllers/Nodemailer/postNodemailerAdminConfirmBuyController.js");

const postNodemailerAdminConfirmBuyHandler = async (req, res) =>{
    try {
        const {name, email, phone, products, total, adress, dropshipping,status} = req.body

        await postNodemailerAdminConfirmBuyController(name, email, phone, products, total, adress, dropshipping,status);

        res.status(200).send("correo enviado con exito")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = postNodemailerAdminConfirmBuyHandler