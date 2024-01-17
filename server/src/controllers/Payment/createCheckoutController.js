require("dotenv").config();
const { DB_STRIPE_TOKEN } = process.env;
const Stripe = require("stripe");
const stripe = new Stripe(DB_STRIPE_TOKEN);

const checkoutController = async (carItems, id) => {
  const updateProduct = carItems.map((item) => ({
    cantidad: item.quantity,
    idProd: item.idProduct,
  }));
  
  const lineItems = carItems.map((item) => ({
    price_data: {
      product_data: {
        name: item.name,
        images: [item.image],
      },
      currency: "pen",
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const queryString = `?userId=${id}&updateProduct=${encodeURIComponent(
    JSON.stringify(updateProduct)
  )}`;
  const successUrl = `https://drewili-pf-back.onrender.com/payment/success${queryString}`;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: successUrl,
    cancel_url: "https://drewilifront.vercel.app/shippingform",
    locale: "auto",
  });

  return session;
};

module.exports = checkoutController;
