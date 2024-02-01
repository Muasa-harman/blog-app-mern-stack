import React, { useEffect, useState } from "react";
import { json, useLocation,useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "react",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  console.log(sidebarData);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get(searchTerm);
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) =>{
    if(e.target.id === 'searchTerm'){
        setSidebarData({...sidebarData, searchTerm: e.target.value});
    }
    if(e.target.id === 'sort'){
        const order = e.target.value || 'desc';
        setSidebarData({...sidebarData,sort:order});
    }
    if(e.target.id === 'category'){
        const category = e.target.value || 'uncategorised';
        setLoading({...sidebarData,category});
    }
  };

  const handleSubmit = () =>{
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search)
    urlParams.set('searchTerm',sidebarData.searchTerm)
    urlParams.set('sort',sidebarData.sort)
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async() =>{
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if(!res.ok){
        return;
    }
    if(res.ok){
        const data = await res.json();
        setPosts([...posts,...data.posts]);
        if(data.posts.length === 0){
            setShowMore(true);
        } else{
            setShowMore(false);
        }
    }
  };
   return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-400">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespce-nowrap font-semibold">
              Search Term:
              <input
                type="text"
                placeholder="Search Term..."
                id="searchTerm"
                value={sidebarData.searchTerm}
                onChange={handleChange}
                className="border p-2 outline-none"
              />
            </label>
          </div>
          <div className="flex items-center gap-2" >
            <label className=" font-semibold">Sort:</label>
            <select className='p-2' onChange={handleChange} value={sidebarData.sort} id="sort" >
                <option className="p-1" value="desc">Latest</option>
                <option className="p-1" value="asc">Oldest</option>
            </select>
          </div>
          <div className="flex items-center gap-2" >
            <label className=" font-semibold">Category:</label>
            <select className='p-2' onChange={handleChange} value={sidebarData.category} id="category">
                <option className="p-1" value="desc">Uncategorised</option>
                <option className="p-1" value="reactjs">Reactjs</option>
                <option className="p-1" value="typescript">Typescript</option>
                <option className="p-1" value="javascript">Javascript</option>
                <option className="p-1" value="nodejs">Nodejs</option>
                <option className="p-1" value="nestjs">Nestjs</option>
            </select>
          </div>
          <button type="submit" className="bg-gradient-to-r focus:outline from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white p-2">Apply Filters</button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">Posts results:</h1>
        <div className="p-7 flex flex-wrap gap-4">
            {!loading && posts.length === 0 && (<p className="text-xl text-gray-400">No results found</p>)}
            {
                loading &&( <p className="text-xl text-gray-500">Loading...</p>)
            }
            {
                !loading && posts && posts.map((post)=>(
                    <PostCard key={post._id} post={post}/>
                ))
            }
            {
                showMore && <button onClick={handleShowMore} className="text-teal-400 text-lg hover:underline p-7 w-full">Show More</button>
            }
        </div>
      </div>
    </div>
  );
};

export default Search;
