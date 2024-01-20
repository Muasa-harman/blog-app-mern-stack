import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { signInSucess,signInStart,signInFailure } from "../redux/user/userSlice";

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading,error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }
    try {
     dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSucess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-gray-500 via-slate-500 to-gray-800 rounded-lg text-white">
              Donfiles
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is my personal project. You can sign in with your email and
            password or with Google.
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            
            <div className="">
              <label value="">
                Your email
                <input
                  className="p-2"
                  type="email"
                  placeholder="name@user.com"
                  id="email"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="">
              <label value="">
                Password
                <input
                  className="p-2"
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
              {loading? ("Loading...") :"Sign In"}
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-3">
            <span className="">Dont Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
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
