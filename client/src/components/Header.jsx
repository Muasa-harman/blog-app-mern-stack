import { Input } from "postcss";
import React from "react";
import { Link,useLocation } from "react-router-dom";
import {AiOutlineSearch} from "react-icons/ai"
import {FaMoon} from "react-icons/fa"
import {  useSelector } from "react-redux";
import Menu from "./Menu";
// import { IoMenuSharp } from "react-icons/io5";

export const Header = () => {
  const path = useLocation().pathname;
  const {currentUser} = useSelector(state => state.user)
  return (
    <header className="border-b-2 p-3 flex items-center justify-between">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semi-bold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white">Donfiles</span>
        Blog
      </Link>
      <form className="flex ">
        <div className="flex items-center">
        <input type="text" className="outline-none"  placeholder="Search..."/>
        <AiOutlineSearch className="hidden lg:inline w-4 h-4"/>
        </div>
        </form>
        <button className="w-12 h-10 lg:hidden"  text="gray"><AiOutlineSearch pill="true" className="w-6 h-6"/></button>
        <div className="flex gap-2 items-center md:order-2">
          <button className="w-12 h-10 hidden items-center sm:inline" ><FaMoon className="w-6 h-6" pill="true"/></button>
          {currentUser? (<Menu />):(

            <Link to="/sign-in"  >
              <button className="bg-gradient-to-r focus:outline from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white">
                Sign-In
              </button>
            </Link>
          )}
          {/* Navbar-toggle */}
        </div>
          <nav className="flex items-center justify-evenly">
          {/* <IoMenuSharp className="w-6 h-6"/> */}
          <div className="mr-5 hover:text-slate-800 focus:border-green-500" >
          <Link to="/projects" >Projects</Link >

          </div>
          <div className="mr-5 hover:text-slate-800 focus:border-green-500">
          <Link  to="/about" >About</Link>
          </div>
          <div className="ml-5 hover:text-slate-800 focus:border-green-500">
          <Link  to="/" >Home</Link>
          </div>
          </nav>
    </header>
  );
};
