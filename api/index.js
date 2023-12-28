//import express
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

var salt = bcrypt.genSaltSync(10);
const jwtsecret = process.env.JWT_SECRET;

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username: username });
  //compare passwords
  const valid = bcrypt.compareSync(password, userDoc.password);
  if (valid) {
    //user is logged in
    jwt.sign({ username, id: userDoc._id }, jwtsecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username: userDoc.username,
      });
    });
  } else {
    // not logged in
    res.status(400).json("Invalid Credentials");
  }
});

//endpoint for jwt token
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, jwtsecret, {}, (err, payload) => {
    if (err) {
      throw err;
    }
    res.json(payload);
  });
});

//endpoint for logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000, () => console.log("Server on port 4000"));
