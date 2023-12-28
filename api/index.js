//import express
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcryptjs';


const app = express();
app.use(cors()); 
app.use(express.json());

var salt= bcrypt.genSaltSync(10);  

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({ username, password:bcrypt.hashSync(password, salt) });
        res.json(userDoc);
    }
    catch(error) {
        res.status(400).json({ error});
    }
});
 
app.post('/login', async (req, res) => { 
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username: username });
    //compare passwords
    const valid = bcrypt.compareSync(password, userDoc.password);
    if (valid)
    {
        //user is logged in

    }
    else {
        // not logged in
        res.status(400).json({ error: 'Invalid Credentials'});
    }
    res.json(valid);
})

app.listen(4000, () => console.log('Server on port 4000'));


