import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess
} from "../redux/user/userSlice";
import Modal from "./Modal";
import {Link }from 'react-router-dom'

const DashProfile = () => {
  const { currentUser,loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSucess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});
  // const [showModal,setShowModal] = useState(false)
  const [showModal,setShowModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*');
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload iamge (File must be less 2MB)"
        );
        setImageFileUploadProgress(null);
        // setImageFileUrl(downloadURL);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // onChange = {handleChange};
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No change made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  
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
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col cursor-pointer shadow-md gap-4"
      >
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
          ref={filePickerRef}
        />
        <div
          className="relative w-32 h-32 self-center"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full border-8 object-cover border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        <span className="text-red-500">{imageFileUploadError}</span>
        <div className="flex flex-col">
          <label className="flex flex-col gap-3">
            Username:
            <input
              className="p-2 border-2"
              type="text"
              placeholder="name"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col gap-3">
            Email:
            <input
              className="p-2 border-2"
              type="email"
              placeholder="email"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col gap-3">
            Password:
            <input
              className="p-2 border-2"
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
            />
          </label>
        </div>
        <button 
          className="bg-gradient-to-r p-2 focus:outline from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white"
          type="submit"
          disabled={loading || imageFileUploading}
        >
          {loading? 'Loading...': 'Update'}
        </button>
        {currentUser.isAdmin && (
        <Link to={'create-post'}>
        <button
          className="bg-gradient-to-r p-2 w-full focus:outline from-gray-800 via-slate-500 to-gray-800 rounded-lg text-white"
          type="submit"
        >
          Create a post
        </button>
        </Link>
        )}
        
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(showModal)} className="cursor-pointer">
          <Modal />
        </span>
        <span onClick={handleSignout} className="cursor-pointer">Sign Out</span>
      </div>
      {updateUserSucess && (
        <span className="text-green-500">{updateUserSucess}</span>
      )}
      {updateUserError && (
        <span className="text-red-500">{updateUserError}</span>
      )}
      {/* {showModal && (<Modal shos={showModal} onClose={()=>setFormData(false)}/>)} */}
    </div>
  );
};

export default DashProfile;
