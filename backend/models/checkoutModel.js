// model.js

const mongoose = require('mongoose');

// Define Receipt Schema
const receiptSchema = new mongoose.Schema({
  items: [{ name: String, count: Number, price: Number }],
  totalCost: Number,
  delivery: Boolean,
  address: String,
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
