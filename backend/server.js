    const express = require('express');
    const mongoose = require('mongoose');

    require('dotenv').config(); 


    // express app
    const app = express();

    //cors
    const cors = require('cors'); // Import the cors middleware
    app.use(cors());
   

    // routes 
    const userRoutes = require('./routes/userRoute')
    const loginRoutes = require('./routes/loginRoute')
    const productRoutes = require('./routes/productRoute')
    const imageRoutes = require('./routes/imageRoute');
    const { saveReceipt } = require('./controllers/checkout-controller'); // Import the controller


    // middleware
    app.use(express.json());
    app.use((req, res, next) => {
        console.log(req.path, req.method);
        next();
    });

    // routes
    app.use('/api/user',userRoutes)
    app.use('/api/login', loginRoutes)
    app.use('/api/product', productRoutes)
    app.use('/api/images', imageRoutes); // Use a prefix like '/images'
    app.post('/api/receipts', saveReceipt);


    // connect to db    

   const MONGO_URI = 'mongodb+srv://seannecanete32:Tuskan32@cluster01-seanneskie.vt8wksv.mongodb.net/';

    // Specify the name of your MongoDB database
    const dbName = 'cafe';

    // Specify the name of the collection you want to connect to

    mongoose.connect(`${MONGO_URI}${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Now that you're connected to the database, you can reference the collection

        // Perform operations on the collection as needed

        // Start your app after connecting to MongoDB
        app.listen(process.env.PORT, () => {
            console.log('Listening on', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });