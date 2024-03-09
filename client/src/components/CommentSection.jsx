import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment.js";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentToDelete,setCommentToDelete] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          content: comment,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) => {
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment;
          })
        );
      }
    } catch (error) {}
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) => {
        c.id === comment._id ? { ...c, content: editedContent } : c;
      })
    );
  };


  const handleDelete = async(commentId) =>{
    setCommentToDelete(commentToDelete,commentId);
    try {
      if(!currentUser){
        navigate('sign-in');
        return;
      }
      const res = await fetch(`api/comment/deleteComment/${commentId}`,{
        method: 'DELETE',
      });
      if(res.ok){
        const data = await res.json();
            setComments(comments.filter((comment)=>comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p className="">Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 flex gap-1 my-5">
          You must signIn to comment.
          <Link className="text-blue-400 hover:underline" to={"/sign-in"}>
            sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-400 rounded-md p-3"
        >
          <textarea
            name=""
            placeholder="Add a comment..."
            id=""
            cols="30"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            rows="4"
          ></textarea>
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-400 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <button
              type="submit"
              className="text-gray-400 rounded bg-gray-100 outline"
            >
              Submit
            </button>
          </div>
          {commentError && <p className="text-red-500 mt-5">{commentError}</p>}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p className="">Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p className="">{comments.length}</p>
            </div>
          </div>
          {comments.map((comment,) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
