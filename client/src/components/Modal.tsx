import React, { useState } from 'react';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {  useDispatch, useSelector } from 'react-redux';
import {deleteFailure, deleteUserStart, deleteUserSuccess} from "@src/redux/user/userSlice";

const Modal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {currentUser,error} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDeleteUser = async() =>{
    setModalOpen(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(deleteFailure(data.message));
      }else{
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  }

  return (
    <div className="relative">
      <span onClick={openModal} className=" cursor-pointer">
        Delete User
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
                <p className="mb-6 text-gray-500">Are you sure you want to delete your account?</p>

                <div className="flex justify-center gap-10">
                  <button onClick={closeModal} type="button" className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 mr-2">
                    No Cancel
                  </button>
                  <button onClick={handleDeleteUser} type="button" className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
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




















// import React, { useState } from "react";

// const Modal = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleDelete = () => {
//     // Handle the delete action here
//     // For example, make an API call to delete the account
//     // and then close the modal
//     // ...

//     // After handling the delete action
//     closeModal();
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-opacity-75 overflow-auto">
//       <button onClick={openModal}>Delete</button>

//       {isModalOpen && (
        
//          <div className="bg-gray-800 text-white w-full h-full p-8">
//           <span onClick={closeModal} className="close" title="Close Modal">
//             &times;
//           </span>
//           <form className="bg-white mx-auto my-5 md:my-20 p-8 border-1 border-gray-800 rounded-lg w-80 sm:w-96 lg:w-2/5">
//             <div className="p-4 text-center text-gray-800">
//               <h1>Delete Account</h1>
//               <p>Are you sure you want to delete your account?</p>

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//                   onClick={handleDelete}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </form>
//          </div>
        
//       )}
//     </div>
//   );
// };

// export default Modal;
