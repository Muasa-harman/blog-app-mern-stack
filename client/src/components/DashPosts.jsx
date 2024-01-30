import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore,setShowMore] = useState(true);
  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if(data.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  const handleShowMore = async() =>{
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUserPosts((prev)=>[...prev, ...data.posts]);
        if(data.posts.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <table className="w-full shadow-md align-center">
            <thead>
              <tr className="gap-3">
                <th>DATE UPDATED</th>
                <th>POST IMAGE</th>
                <th>POST TITLE</th>
                <th>POST CATEGORY</th>
                <th>DELETE</th>
                <th>
                  <span className="hidden md:block">EDIT</span>
                </th>
              </tr>
            </thead>
            {userPosts.map((post, index) => (
              <tbody className="divide-y">
                <tr
                  className="bgwhite dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/post/${post.slug}`}>{post.category}</Link>
                  </td>
                  <td>
                    <span className="font-medium text-red-500 hover:underline">
                      Delete
                    </span>
                  </td>
                  <td>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
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
        <p>You have no posts yet!</p>
      )}
    </div>
  );
};
