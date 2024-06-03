const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = process.env.MONGO_URL;

mongoose.connect(connectDB)
    .then(() => {
        console.log('Connected to MongoDB !!!');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });
