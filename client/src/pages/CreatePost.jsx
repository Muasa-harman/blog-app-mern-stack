import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError,setPublishError] = useState(null);

  const navigate = useNavigate();


  const handleUploadImage = async () => {
    try {
      if (!file) {
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((getDownloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: getDownloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
const handleSubmit = async(e) =>{
  e.preventDefault();
  try {
    const res = await fetch('/api/post/create', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data = await res.json();
    if(!res.ok){
      setPublishError(data.message)
      return;
    }
    if(res.ok){
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    }
  } catch (error) {
    setPublishError('Sometning went wrong');
  }
}
 
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1 p-3 border"
            onChange={(e)=>{
              console.log("Title changed:", e.target.value);
              setFormData({...formData,title:e.target.value})
            }}
              
          />
          <select className="border rounded p-2 text-gray-700 font-normal"
          onChange={(e)=>setFormData({...formData, category:e.target.value})}
          >
            <option value="uncategorised" className=" font-bold">
              Select a Category
            </option>
            <option value="react" className=" font-bold">
              React
            </option>
            <option value="typescript" className=" font-bold">
              TypeScript
            </option>
            <option value="javascript" className=" font-bold">
              Javascript
            </option>
            <option value="nest" className=" font-bold">
              Nestjs
            </option>
            <option value="nest" className=" font-bold">
              Python.
            </option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-5">
          <input
            type="file"
            className=""
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
            type="button"
            className="outline size-sm hover:bg-gradient-to-r focus: from-gray-800 p-2"
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload-image"
            )}
          </button>
        </div>
        {imageUploadError && (
          <span className="text-red-500">{imageUploadError}</span>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something ..."
          className="h-72 mb-12"
          required
          onChange={(value,delta,source)=>{setFormData({...formData,content:value});}}
        />
        <button
          className="bg-gradient-to-r p-2 w-full focus:outline from-gray-800 via-slate-500 to-gray-800 rounded-lg text-white"
          type="submit"
        >
          Publish
        </button>
        {publishError && (<span className="text-red-500 mt-5">{publishError}</span>)}
      </form>
    </div>
  );
};

export default CreatePost;
