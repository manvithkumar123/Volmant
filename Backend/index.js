require('dotenv').config();
console.log(
  "Stripe Key Loaded:",
  process.env.STRIPE_SECRET_KEY ? "✅" : "❌",
  process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.slice(0,10)+"..." : ""
);
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌ STRIPE_SECRET_KEY is missing. Check your .env file or Render Environment Variables.");
}
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
const path=require("path");
const cors = require("cors");
const AnalogRoute=require("./Routes/AnalogRoute")
const DigitalRoute=require("./Routes/DigitalRoute");
const SmartRoute = require("./Routes/SmartRoute");
const RetroRoute = require("./Routes/RetroRoute");
const LoginRoute = require("./Routes/LoginRoute");
const PromotedRoute = require("./Routes/PromotedRoute");
const Cartroute = require("./Routes/CartRoute");
const cookieParser = require("cookie-parser");



app.use(cookieParser());

app.use(cors({
  origin: "https://volmant.netlify.app",
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine' ,'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/analog", AnalogRoute)
app.use("/api/digital", DigitalRoute)
app.use("/api/smartwatch", SmartRoute)
app.use("/api/retro", RetroRoute)
app.use("/api/login", LoginRoute)
app.use("/api/promoted", PromotedRoute)
app.use("/api/cart", Cartroute)

app.get("/",(req,res)=>{
    res.send("sucessful")
})

app.post("/api/create-checkout-session", async (req, res) => {
  console.log("=== Checkout session requested ===");
  console.log("Request body:", req.body);

  try {
    const { amount } = req.body;
    console.log("Amount received:", amount);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: { name: "Cart Items" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://volmant.netlify.app/success",
cancel_url: "https://volmant.netlify.app/cancel",
    });

    console.log("=== Stripe session created ===");
    console.log(session);
    res.json({ id: session.id });
  } catch (err) {
    console.error("=== Stripe error occurred ===");
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));