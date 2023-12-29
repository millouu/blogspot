import { mongoose, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise; 

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    coverImage: String,
    author:{type: Schema.Types.ObjectId, ref: "Users"},
}, {
    timestamps: true
})

const PostModel = mongoose.models.Posts || mongoose.model("Posts", PostSchema, "Posts");
export default PostModel;