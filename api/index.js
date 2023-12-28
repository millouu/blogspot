//import express
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({ username, password });
        res.json(userDoc);
    }
    catch(error) {
        res.status(400).json({ error});
    }
 });

app.listen(4000, () => console.log('Server on port 4000'));


