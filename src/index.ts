import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const upload = multer({ dest: 'uploads/' });

app.use('/auth', require('./routes/authRoutes'));
app.use('/user', require('./routes/taskRoutes'));
app.use('/chat', require('./routes/chatRoutes'));

app.get('/', (req: Request, res: Response) => {
    res.send('App Running at PORT: ' + PORT);
});

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/chatapp';
mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});