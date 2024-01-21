import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

const DashSidebar = () => {
  const Location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="bg-gray-300 w-full">
      <div className="mt-5 bg-gray-300">
        <Link to="/dashboard?tab=profile">
          <span
            active={tab === "profile"}
            className="flex mb-5 p-3 gap-4 active-bg-gray-400 hover:bg-white items-center bg-gray-200 w-52"
          >
            <HiUser />
            Profile <br />
            <span className="bg-slate-300 text-white">User</span>
          </span>
        </Link>

        <span className="flex cursor-pointer p-3 gap-3 hover:bg-white bg-gray-200 w-52 items-center">
          <HiArrowSmRight />
          Log Out <br />
        </span>
      </div>
    </div>
  );
};

export default DashSidebar;
