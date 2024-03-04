import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Oauth from "../components/Oauth";

export const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-gray-200 via-slate-300 to-gray-400 rounded-lg text-white">
              HarmanMuasa
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is my personal project. You can sign up wth your email and
            password or with Google.
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label value="" className="flex flex-col gap-3">
                Your username
                <input
                  className="p-2 border-2"
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="">
              <label value="" className="flex flex-col gap-3">
                Your email
                <input
                  className="p-2 border-2"
                  type="email"
                  placeholder="name@user.com"
                  id="email"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="">
              <label value="" className="flex flex-col gap-3">
                Password
                <input
                  className="p-2 border-2"
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r focus:outline from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white p-2"
            >
              {loading? ("Loading...") :"Sign Up"}
            </button>
            <Oauth/>
          </form>
          <div className="flex gap-2 text-sm mt-3">
            <span className="">Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          <span className="text-red-500">{errorMessage}</span>
          {/* && (( */}
          {/* //   <ToastContainer>{errorMessage}</ToastContainer> */}
          {/* )) } */}
        </div>
      </div>
    </div>
  );
};
