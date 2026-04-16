import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import AuthRoute from './routes/AuthRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/images', express.static('images'));

app.use('/auth', AuthRoute);


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log('Database connection error:', error.message);
        process.exit(1);
    }  
};

connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})