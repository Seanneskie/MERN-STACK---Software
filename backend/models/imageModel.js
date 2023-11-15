const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,        // Add a field for the image name
  data: Buffer,
  contentType: String,
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
