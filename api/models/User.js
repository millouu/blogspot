import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise; 

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true, min: 4 },
  password: { type: String, required: true, min: 6 },
});

const model =
  mongoose.models.Users || mongoose.model("Users", UserSchema, "Users");
export default model;
