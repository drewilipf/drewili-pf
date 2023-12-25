require('dotenv').config()
const { DB_STRIPE_TOKEN } = process.env
const Stripe = require('stripe')
const stripe = new Stripe(DB_STRIPE_TOKEN)

const checkoutController = async (carItems) => {
    const lineItems = carItems.map((item)=>({
        price_data: {
            product_data: {
                name: item.name,
                images:[item.image]
            },
            currency: item.currency,
            unit_amount: item.amount * 100,
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3001/payment/success',
        cancel_url: 'http://localhost:3001/payment/cancel',
        locale: 'auto'
    });

    return session;
}

module.exports = checkoutController;