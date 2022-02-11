const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {

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

  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = { stripeController };
