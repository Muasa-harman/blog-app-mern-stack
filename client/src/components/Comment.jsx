import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike,onEdit }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [editedContent, setEditedContent] = useState(comment.conted);
  const [isEditing, setIsEditing] = useState(false);
  console.log(user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        // console.log(error);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = async () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async() =>{
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`,{
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          content: editedContent
        })
      });
      if(res.ok){
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <textarea
              className="w-full mb-2 p-2 text-gray-700 bg-gray-200 rounded-md resize-none focus:outline-none"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                type="button"
                size="sm"
                className="bg-gradient-to-r focus:outline from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white p-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                size="sm"
                className="rounded-lg  p-2 outline"
                onClick={()=>setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                onClick={() => onLike(comment._id)}
                type="button"
                className={`text-gray-400 hover:text-blue-400 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-400"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    "" +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    onClick={handleEdit}
                    type="button"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
