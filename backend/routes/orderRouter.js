const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const router = express.Router();

const OrderSchema = new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

// Route to handle checkout
router.post("/checkout", async (req, res) => {
  const { items, totalAmount } = req.body;

  const newOrder = new Order({
    items,
    totalAmount,
  });

  try {
    await newOrder.save();
    res.json({ message: "Order saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save order", error });
  }
});

// Route to fetch order history
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
});

module.exports = router;
