import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import {GoogleAuthProvider, signInWithPopup,getAuth} from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSucess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const auth = getAuth(app)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async() =>{
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt: 'select_account'})
    try {
      const resultsFromGoogle = await signInWithPopup(auth,provider)
     const res = await fetch('/api/auth/google', {
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        name: resultsFromGoogle.user.displayName,
        email:resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      }),
     })
     const data = await res.json()
     if(res.ok){
      dispatch(signInSucess(data))
      navigate('/')
     }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex items-center">
      <button
      onClick={handleGoogleClick}
        type="button"
        className="bg-gradient-to-r hover:to-white-600 outline focus:outline flex items-center from-gray-500 w-full via-slate-700 to-gray-800 rounded-lg text-white p-2"
      >
        <AiFillGoogleCircle className="w-6 h-6 mr-2 text-black-400"/>
        Continue with Google
      </button>
    </div>
  );
};

export default Oauth;
