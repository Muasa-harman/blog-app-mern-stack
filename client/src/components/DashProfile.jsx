import React from "react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col cursor-pointer shadow-md gap-4">
        <div className="w-32 h-32 self-center">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 object-cover border-[lightgray]"
          />
        </div>
        <div className="flex flex-col">
          <label className="flex flex-col gap-3">Username:
          <input className="p-2 border-2" type="text" placeholder="name" id="username" defaultValue={currentUser.username}/>
          </label>
          <label className="flex flex-col gap-3">Email:
          <input className="p-2 border-2" type="email" placeholder="email" id="email" defaultValue={currentUser.email}/>
          </label>
          <label className="flex flex-col gap-3">Password:
          <input className="p-2 border-2" type="password" placeholder="password" id="password" />
          </label>
        </div>
        <button className="bg-gradient-to-r p-2 focus:outline from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white" type="submit">Update</button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
