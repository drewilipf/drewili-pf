require('dotenv').config()
const { DB_STRIPE_TOKEN } = process.env
const Stripe = require('stripe')
const { SalesCart } = require('../../db')
const stripe = new Stripe(DB_STRIPE_TOKEN)

const checkoutController = async (carItems, id) => {
    const lineItems = carItems.map((item)=>({
        price_data: {
            product_data: {
                name: item.name,
                images:[item.image]
            },
            currency: 'pen',
            unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
    }));
    const successUrl = `http://localhost:3001/payment/success?userId=${id}`;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl,
        cancel_url: 'http://localhost:5173/shoppingcart',
        locale: 'auto'
    });

    return session;
}

module.exports = checkoutController;