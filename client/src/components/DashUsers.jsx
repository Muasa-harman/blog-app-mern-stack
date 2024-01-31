import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {FaCheck, FaTimes} from 'react-icons/fa'

export const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore,setShowMore] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [userIdToDelete,setUserIdToDelete] = useState('');
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if(data.users.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if(currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);
  const handleShowMore = async() =>{
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUsers((prev)=>[...prev, ...data.users]);
        if(data.posts.length < 9){
          setShowMore(false);
        }
      }
    } catch (error) {
      // console.log(error.message)
    }
  }

  const handleDeleteUser = async() =>{
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`,
      {method: 'DELETE',
    });
    if(res.ok){
      setUsers(updatedUsers)
      // setUsers((prev)=>prev.filter((user)=>user._id !==userIdToDelete));
      setShowModal(false);
      
    } else {
        const data = await res.json();
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  } 
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className="w-full shadow-md align-center">
            <thead>
              <tr className="gap-3">
                <th>DATE CREATED</th>
                <th>USER IMAGE</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>DELETE</th>
              </tr>
            </thead>
            {users.map((user, index) => (
              <tbody key={index} className="divide-y">
                <tr
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={index}
                >
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td key={index}>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                  </td>
                  <td>
                      {user.username}
                  </td>
                  <td>
                    {user.email}
                  </td>
                  <td>
                    {user.isAdmin ? (<FaCheck className="text-green-500"/>): (<FaTimes className="text-red-500"/>)}
                  </td>
                  <td>
                    <span onClick={handleDeleteUser} className="font-medium text-red-500 hover:underline">
                    Delete
                    </span>
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
        <p>You have no users yet!</p>
      )}
    </div>
  );
};
