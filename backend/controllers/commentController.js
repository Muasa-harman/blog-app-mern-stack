import Comment from "../models/Comment.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async(req,res,next)=>{
    const {content, postId, userId} = req.body;
    try {
        if(userId !== req.user.id){
            return next(errorHandler(403, 'You are not allowed to create this comment'));
        }

        const newComment = new Comment({
            userId,
            content,
            postId,
        });
        await newComment.save();

        res.status(200).json(newComment);
    } catch (error) {
        next(error)
    }
}