const Image = require('../models/imageModel'); // Import the Mongoose Image model

// Function to upload and save an image to the database
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const image = new Image({
      name: req.body.name, // Get the image name from the request body
      data: req.file.buffer,
      contentType: req.file.mimetype,
    });

    await image.save();

    return res.status(201).json({ message: 'Image saved successfully.' });
  } catch (error) {
    console.error('Error saving image:', error);
    return res.status(500).json({ message: 'Error saving the image.' });
  }
};


// Function to retrieve an image from the database by its ID
const getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found.' });
    }

    res.setHeader('Content-Type', image.contentType);
    res.send(image.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    return res.status(500).json({ message: 'Error fetching the image.' });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();

    if (!images || images.length === 0) {
      return res.status(404).json({ message: 'No images found.' });
    }

    // Create an array to store image data as data URLs
    const imageArray = [];
    for (const image of images) {
      // Convert Buffer to base64 string
      const base64Image = image.data.toString('base64');
      // Create a data URL for the image
      const dataURL = `data:${image.contentType};base64,${base64Image}`;
      imageArray.push({
        contentType: image.contentType,
        data: dataURL,
      });
    }

    return res.status(200).json(imageArray);
  } catch (error) {
    console.error('Error fetching images:', error);
    return res.status(500).json({ message: 'Error fetching images.' });
  }
};

const getImageByName = async (req, res) => {
  try {
    const imageName = req.params.name;

    const image = await Image.findOne({ name: imageName });

    if (!image) {
      return res.status(404).json({ message: 'Image not found.' });
    }

    res.setHeader('Content-Type', image.contentType);
    res.send(image.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    return res.status(500).json({ message: 'Error fetching the image.' });
  }
};




module.exports = {
  uploadImage,
  getImage,
  getAllImages,
  getImageByName
};
