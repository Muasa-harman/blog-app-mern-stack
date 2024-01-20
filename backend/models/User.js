import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type:String,
        default: "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg",
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;