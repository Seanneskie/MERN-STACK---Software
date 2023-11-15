const Product = require('../models/productModel');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Retrieve product data from the request body
    const { name, description, price, category } = req.body;

    // Get the filename of the uploaded image from req.file

    // Create a new product with the image filename
    const product = new Product({ name, description, price, category });

    // Save the product to the database
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a list of all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.productId);
    if (!deletedProduct) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
