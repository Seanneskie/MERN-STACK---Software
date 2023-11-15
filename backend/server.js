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


    mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            app.listen(process.env.PORT, () => {
                console.log('listening on', process.env.PORT)
            });
        })
        .catch((error) => {
            console.log(error);
        })  

    // listen for requests
