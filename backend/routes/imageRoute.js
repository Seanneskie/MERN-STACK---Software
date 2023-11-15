const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads

const imageController = require('../controllers/image-controller'); // Import the image controller

// Define a storage engine for multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload an image
router.post('/upload', upload.single('image'), imageController.uploadImage);

// Route to retrieve an image by ID
router.get('/:id', imageController.getImage);

router.get('/', imageController.getAllImages);

router.get('/name/:name', imageController.getImageByName);



module.exports = router;
