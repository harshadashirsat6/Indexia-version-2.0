const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/account");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process stripe payments => /payment/process
router.post("/create-payment", async (req, resp) => {
  const { amount } = req.body;
  console.log("=>", req.body.amount);
  const lineItems = [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: "Payment",
        },
        unit_amount: amount * 100,
      },
      quantity: 1,
    },
  ];
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://github.com/Sukrit303",
    cancel_url: "https://localhost:5000/route/response/sucess.html",
  });
  console.log(session.url);
  resp.json({ urlToRedirect: session.url });
  // resp.status(201).json({link: session.url})
});
/*
router.post("/payment", userMiddleware, async (req, resp) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "inr",
            source : req.body.source,
            metadata: { integration_check: "accept_a_payment" },
        });
        resp.json({
            success: true,
            client_secret: paymentIntent.client_secret,
        });
    } catch (err) {
        resp.json({ success: false, msg: err.message });
    }
});
*/
// Send stripe API Keys => /stripeapi
router.get("/stripeapi", async (req, resp) => {
  try {
    resp.status(200).json({
      stripeApiKey: `${process.env.STRIPE_SECRET_KEY}`,
    });
  } catch (err) {
    resp.json({ success: false, msg: err.message });
  }
});

module.exports = router;
