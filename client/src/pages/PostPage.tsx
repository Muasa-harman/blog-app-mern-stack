import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {SpinnerCircular} from "spinners-react";
import CallToAction from "../components/CallToAction.js";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard.js";

const PostPage = () => {
    const {postSlug} = useParams();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [post, setPost] = React.useState(null);
    const [recentPosts, setRecentPosts] = React.useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`/api/post/getposts?limit=3`);
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                }
            };
            fetchRecentPosts();
        } catch (error) {
            console.log(error.message);
        }
    }, []);

    if (loading) return;
    <div className="flex justify-cente items-center min-h-screen">
        <SpinnerCircular size="xl"/>
    </div>;

    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                {post && post.title}
            </h1>
            <Link
                className="self-center mt-5"
                to={`/search?category=${post && post.category}`}
            >
                <button className="text-gray-600 rounded bg-gray-200" size="xl">
                    {post && post.category}
                </button>
            </Link>
            <img
                src={post && post.image}
                alt={post && post.title}
                className="mt-10 p-3 max-h-[600px] w-1/2 object-cover"
            />
            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xl">
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="italic">{post && (post.content.length / 1000).toFixed(0)} mins reads</span>
            </div>
            <div className="p-3 max-w-2xl mx-auto w-full post-content"
                 dangerouslySetInnerHTML={{__html: post && post.content}}>
            </div>
            <div className="max-w-4xl mx-auto w-full">
                <CallToAction/>
            </div>
            <CommentSection postId={post._id}/>

            <div className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-xl mt-5">Recent articles</h1>
                <div className="flex flex-wrap gap-3 mt-5 justify-center">
                    {recentPosts && recentPosts.map((post) => (
                        <PostCard key={post._id} post={post}/>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default PostPage;
