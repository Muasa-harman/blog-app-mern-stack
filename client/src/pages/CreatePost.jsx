import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1 p-3 border"
          />
          <select className="border rounded p-2 text-gray-700 font-normal">
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
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-5">
          <input type="file" className="" accept="image/*" />
          <button type="button" className="outline size-sm hover:bg-gradient-to-r focus: from-gray-800 p-2">Upload image</button>
        </div>
        <ReactQuill theme="snow" placeholder="Write something ..." className="h-72 mb-12" required/>
        <button className="bg-gradient-to-r p-2 w-full focus:outline from-gray-800 via-slate-500 to-gray-800 rounded-lg text-white" type="subbmit">Publish</button>
      </form>
    </div>
  );
};

export default CreatePost;
