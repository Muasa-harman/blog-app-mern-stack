import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

const DashSidebar = () => {
  const Location = useLocation();
  const [tab, setTab] = useState("");
  const {currentUser} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async() =>{
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      
    }
  }
  return (
    <div className="bg-gray-300 w-full">
      <div className="mt-5 bg-gray-300 flex flex-col gap-1">
        <Link to="/dashboard?tab=profile">
          <span
            // active={tab === "profile"}
            className="flex mb-5 p-3 gap-4 active-bg-gray-400 hover:bg-white items-center bg-gray-200 w-52"
          >
            <HiUser />
            Profile <br />
            <span className="bg-slate-300 text-white">{currentUser.isAdmin ? 'Admin':'User'}</span>
          </span>
        </Link>
        {currentUser.isAdmin && (
        <Link to="/dashboard?tab=posts">
          <span
            // active={tab === "profile"}
            className="flex mb-5 p-3 gap-4 active-bg-gray-400 hover:bg-white items-center bg-gray-200 w-52"
          >
            <HiDocumentText />
            Post <br />
            {/* <span className="bg-slate-300 text-white">User</span> */}
          </span>
        </Link>   
        )}

{currentUser.isAdmin && (
        <Link to="/dashboard?tab=users">
          <span
            // active={tab === "profile"}
            className="flex mb-5 p-3 gap-4 active-bg-gray-400 hover:bg-white items-center bg-gray-200 w-52"
          >
            <HiOutlineUserGroup />
            Users <br />
            {/* <span className="bg-slate-300 text-white">User</span> */}
          </span>
        </Link>   
        )}


        <span onClick={handleSignout} className="flex cursor-pointer p-3 gap-3 hover:bg-white bg-gray-200 w-52 items-center">
          <HiArrowSmRight />
          Log Out <br />
        </span>
      </div>
    </div>
  );
};

export default DashSidebar;
