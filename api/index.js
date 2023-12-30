//import express
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import PostModel from "./models/Post.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
//for using the images in the uploads folder
app.use("/uploads", express.static("uploads"));

var salt = bcrypt.genSaltSync(10);
const jwtsecret = process.env.JWT_SECRET;

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.send("ok");
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

//endpoint for creating new post
const upload = multer({ dest: "uploads/" });
app.post("/createpost", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const partsOfFilename = originalname.split(".");
  const extension = partsOfFilename[partsOfFilename.length - 1];
  const newPath = path + "." + extension;
  fs.renameSync(path, newPath);

  //for getting the author name
  const { token } = req.cookies;
  jwt.verify(token, jwtsecret, {}, async (err, payload) => {
    if (err) {
      throw err;
    }
    const postDoc = await PostModel.create({
      title: req.body.title,
      description: req.body.description,
      summary: req.body.summary,
      content: req.body.content,
      coverImage: newPath,
      author: payload.id,
    });
  });
});

//endpoint for getting all posts
app.get("/getallposts", async (req, res) => {
  const posts = await PostModel.find()
    .populate("author", { username: 1 })
    .sort({ createdAt: -1 })
    .limit(10);
  res.json(posts);
});

//endpoint for getting a single post using id
app.get("/getpost/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await PostModel.findById(id).populate("author",{username:1})
  res.json(postDoc);
})

app.listen(4000, () => console.log("Server on port 4000"));
