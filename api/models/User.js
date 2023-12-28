import mongoose,{Schema} from "mongoose";
mongoose.connect('mongodb+srv://admin:6X4g62aLVo45ADGH@cluster0.sy0hg5o.mongodb.net/Blogspot')
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true, min: 4 },
    password: { type: String, required: true, min: 6 }
})

const model = mongoose.models.Users || mongoose.model('Users', UserSchema,'Users');
export default model;