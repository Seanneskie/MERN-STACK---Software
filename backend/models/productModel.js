const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: 'Price must be a non-negative number.',
        },
    },
    category: {
        type: String,
        required: true,
    },

    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
    }

   
    // Add a field to store the image filename or other relevant information
});


const Product = mongoose.model('Product', productSchema);


module.exports = Product;
