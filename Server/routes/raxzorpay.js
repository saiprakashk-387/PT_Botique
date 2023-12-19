const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});
router.post("/api/createOrder", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: req.body.amount,
      currency: "INR",
    });
    res.send(order);
  } catch (error) {
    res.send(error);
  }
});

// Endpoint for handling successful payments
router.post("/api/verifySignature", (req, res) => {
  const { orderID, transaction, signature } = req.body;
  const generatedSignature = crypto
    .createHmac("sha256", razorpay?.key_secret)
    .update(`${orderID}|${transaction}`)
    .digest("hex");

  res.send({
    validSignature: generatedSignature === signature,
  });
});
module.exports = router;
