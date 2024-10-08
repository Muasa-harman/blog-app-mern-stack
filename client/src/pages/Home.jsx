import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from '../components/CallToAction';
import PostCard from "../components/PostCard";
import GistEmbed from "../components/Embedd";
// import 'bootstrap/dist/css/bootstrap.min.css';


export const Home = () => {
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  },[]);
  // p-28  max-w-6xl
  return (
    <div className="">
      <div className="flex flex-col gap-6  mx-auto">
        <h1 className="text-3xl font-bold">Welcome to my developer' blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Hey, you'll find a variety of articles and tutorials on topics such as
          web development,software engineering, and programming languages.
          ?
        </p>
      <Link to='/search' className="text-xs sm:text-sm text-teal-500 font-bold hover:underline">View all posts</Link>
      </div>
      <div className="flex p-3 bg-amber-100 dark:bg-slate-700 justify-center">
        <CallToAction/>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <GistEmbed/>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post)=>(
                <PostCard key={post._id} post={post}/>
              ))}
            </div>
            <Link to={'/search'} className="text-lg text-teal-500 hover:underline text-center">View all posts</Link>
            </div>
        )}
      </div>
    </div>
  );
};


