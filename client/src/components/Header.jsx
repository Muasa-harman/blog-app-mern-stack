import React, { useEffect, useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Menu from "./Menu";
import { toggleTheme } from "../redux/theme/themeSlice";
// import { IoMenuSharp } from "react-icons/io5";

export const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
     
    }
  }, [location.search]);

  const handleSubmit = (e) =>{
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    const currentSearchTerm = urlParams.get('searchTerm');

    // Check if the search term has changed
  if (searchTerm !== currentSearchTerm) {
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`,{replace: true});
  }
  };
  return (
    <header className="border-b-2 p-3 flex items-center justify-between">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semi-bold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-gray-500 via-slate-500 to-gray-400 rounded-lg text-white">
          Harman Muasa
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit} className="flex ">
        <div className="flex items-center">
          <input
            type="text"
            className="outline-none border p-2"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <AiOutlineSearch className="hidden lg:inline w-4 h-4" />
      <button type="submit" className="w-12 h-10 lg:hidden" text="gray">
        <AiOutlineSearch pill="true" className="w-6 h-6" />
      </button>
        </div>
      </form>
      <div className="flex gap-2 items-center md:order-2">
        <button
          onClick={() => dispatch(toggleTheme())}
          className="w-12 h-10 hidden items-center sm:inline"
        >
          {theme === "light" ? (
            <FaSun />
          ) : (
            <FaMoon className="w-6 h-6" pill="true" />
          )}
        </button>
        {currentUser ? (
          <Menu />
        ) : (
          <Link to="/sign-in">
            <button className="bg-gradient-to-r focus:outline from-gray-500 via-slate-500 to-gray-400 rounded-lg text-white">
              Sign-In
            </button>
          </Link>
        )}
        {/* Navbar-toggle */}
      </div>
      <nav className="flex items-center justify-evenly">
        {/* <IoMenuSharp className="w-6 h-6"/> */}
        <div className="mr-5 hover:text-slate-800 focus:border-green-500">
          <Link to="/projects">Projects</Link>
        </div>
        <div className="mr-5 hover:text-slate-800 focus:border-green-500">
          <Link to="/about">About</Link>
        </div>
        <div className="ml-5 hover:text-slate-800 focus:border-green-500">
          <Link to="/">Home</Link>
        </div>
      </nav>
    </header>
  );
};
