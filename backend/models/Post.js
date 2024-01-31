import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title:{
    type:String,
    required:true
  },
  content: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1277014518/photo/young-woman-working-with-a-laptop-female-freelancer-connecting-to-internet-via-computer.webp?b=1&s=170667a&w=0&k=20&c=ynh_WXBzNTfEYSskHooZxSaSqoSwJNqAEwGtLW-zq3s=",
  },
  category: {
    type: String,
    required: true,
    uniques: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
},{timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;
