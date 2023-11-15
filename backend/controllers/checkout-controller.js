// receiptController.js

const Receipt = require('../models/checkoutModel'); // Import the Receipt model

// Controller to handle saving receipt data
const saveReceipt = async (req, res) => {
  const receiptData = req.body;

  try {
    const newReceipt = new Receipt(receiptData);
    await newReceipt.save();
    res.status(201).send('Receipt saved successfully');
  } catch (error) {
    console.error('Error saving receipt:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  saveReceipt,
};
