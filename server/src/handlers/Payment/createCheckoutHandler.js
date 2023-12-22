require('dotenv').config()
const {DB_STRIPE_TOKEN} = process.env
const Stripe = require('stripe')
const stripe = new Stripe(DB_STRIPE_TOKEN)

const checkoutHandler = async (req, res) => {
    if (!req.session.user) {
        return res.status(400).json({ error: 'usuario no autenticado' })
    }
    const userId = req.session.user.userId
    console.log(userId);
    res.status(200).json(userId)
    try {

    }
    catch (error) {

    }

}

module.exports = checkoutHandler