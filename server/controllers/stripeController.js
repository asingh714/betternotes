const stripe = require("stripe")(process.env.STRIPE_KEY);
const sendOrderEmail = require("../util/sendOrderEmail");

const stripeController = async (req, res) => {
  console.log(req.body);
  const calculateOrderAmount = () => {
    return 1099;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // EMAIL LOGIC HERE
  sendOrderEmail(email, document, user_name);

  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = { stripeController };
