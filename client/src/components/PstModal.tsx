import React, { useState } from 'react';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {  useDispatch, useSelector } from 'react-redux';

const Modal = ({post}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {currentUser,error} = useSelector((state) => state.user)
  const [postIdToDelete,setPostIdToDelete] = useState("")
  const dispatch = useDispatch()

  const openModal = () => {
    setModalOpen(true);
    setPostIdToDelete(post && post._id);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDeletePost = async() =>{
    setModalOpen(false);
    setPostIdToDelete(post && post._id);
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(res.ok){
        console.log(data.message);
      }else{
        setUserPosts((prev)=> prev.filter((post)=>post._id !== postIdToDelete));
      }
    } catch (error) {
        console.log(error.message)
    }
  }

  return (
    <div className="relative">
      <span onClick={openModal} className=" cursor-pointer">
        Delete
      </span>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 overflow-auto">
          <div className="bg-white mx-auto mt-20 p-8 w-4/5">
            <span onClick={closeModal} className="close absolute top-3 right-3 text-2xl font-bold cursor-pointer">
              &times;
            </span>
            <form className="modal-content" action="/action_page.php">
              <div className="align-center text-center">
                <HiOutlineExclamationCircle className='w-20 h-20 mx-auto text-gray-400 dark:text-gray-200'/>
                <h1 className="text-2xl font-bold mb-4 p-4 text-center text-gray-800">Delete Account</h1>
                <p className="mb-6 text-gray-500">Are you sure you want to delete this post?</p>

                <div className="flex justify-center gap-10">
                  <button onClick={closeModal} type="button" className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 mr-2">
                    No Cancel
                  </button>
                  <button onClick={handleDeletePost} type="button" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                    Yes,am sure
                  </button>
                </div>
              </div>
              {error  && (<span className='mt-5'>{error}</span>)}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;








