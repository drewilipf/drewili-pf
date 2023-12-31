const checkoutController = require('../../controllers/Payment/createCheckoutController')

const checkoutHandler = async (req, res) => {
    const cartItems = req.body.cartItems
    try {
        const response = await checkoutController(cartItems)
        res.status(200).json({urlPayment:response.url})

    }
    catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud de pago' });
    }

}

module.exports = checkoutHandler