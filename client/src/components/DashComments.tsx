import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [commentIdToDelete,setCommentIdToDelete] = useState('');
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if(data.comments.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if(currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);
  const handleShowMore = async() =>{
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setComments((prev)=>[...prev, ...data.comments]);
        if(data.comments.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      // console.log(error.message)
    }
  }

  const handleDeleteComment = async() =>{
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,
      {method: 'DELETE',
    });
    const data = await res.json()
    if(res.ok){
      setComments(updatedComments)
      // setUsers((prev)=>prev.filter((user)=>user._id !==userIdToDelete));
      setShowModal(false);
      
    } else {
        const data = await res.json();
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  } 
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <table className="w-full shadow-md align-center">
            <thead>
              <tr className="gap-3">
                <th>DATE UPDATED</th>
                <th>COMMENT CONTENT</th>
                <th>NUMBER OF LIKES</th>
                <th>POSTID</th>
                <th>USERID</th>
                <th>DELETE</th>
              </tr>
            </thead>
            {comments.map((comment, index) => (
              <tbody key={index} className="divide-y">
                <tr
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <td>{new Date(comment.updatedAt).toLocaleDateString()}</td>
                  <td key={index}>
                      {comment.content}
                  </td>
                  <td>
                      {comment.numberOfLikes}
                  </td>
                  <td>
                    {comment.postId}
                  </td>
                  <td>{comment.userId}</td>
                  <td>
                    <span onClick={handleDeleteComment} className="font-medium text-red-500 hover:underline">
                    Delete
                    </span>
                  </td>
                  
                </tr>
              </tbody>
            ))}
          </table>
          {showMore && (
            <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Show more</button>
          )}
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}
    </div>
  );
};

export default DashComments
