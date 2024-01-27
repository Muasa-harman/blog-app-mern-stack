import React from 'react'
import { signoutSuccess } from '../redux/user/userSlice';
import {  useSelector,useDispatch } from "react-redux";


const Menu = () => {
  const dispatch = useDispatch()
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
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className='group relative mr-10'>
    <button className='bg-color-inherit text-white px-2 py-2'><img className='w-8 h-8 rounded' src={currentUser.profilePicture} alt="" /></button>
    <div className="hidden group-hover:block absolute top-full left-0 bg-gray-100 border border-gray-300 py-2">
      <a className="block px-4 py-3 text-black no-underline transition duration-300 hover:bg-gray-300 block text-sm" href="#">{currentUser.username}</a>
      <a className="block px-4 py-3 text-black no-underline transition duration-300 hover:bg-gray-300 text-sm font-medium truncate" href="#">{currentUser.email}</a>
      <a className="block px-4 py-3 text-black no-underline transition duration-300 hover:bg-gray-300" href="/dashboard?tab=profile">Profile</a>
      <div className="">
      <a onClick={handleSignout} className="block px-4 py-3 text-black no-underline transition duration-300 hover:bg-gray-300 text-sm font-medium truncate" href="#">Sign Out</a>
      </div>
    </div>
  </div> 
  )
}

export default Menu