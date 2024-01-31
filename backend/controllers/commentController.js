import Comment from "../models/Comment.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  const { content, postId, userId } = req.body;
  try {
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      userId,
      content,
      postId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments)
  } catch (error) {
    next(error);
  }
};

export const likeComment = async(req,res,next) =>{
    try {
       const comment = await Comment.findById(req.params.commentId);
       if(!comment){
        return next(errorHandler(403, 'Comment not fount'));
       } 
       const userIndex = comment.likes.indexOf(req.user.id);
       if(userIndex === -1){
           comment.numberOfLikes += 1;
           comment.likes.push(req.user.id);
       } else {
        comment.numberOfLikes -= 1;
        comment.likes.splice(userIndex, 1);
       }
       await comment.save();
       res.status(200).json(comment);
    } catch (error) {
        
    }
}
